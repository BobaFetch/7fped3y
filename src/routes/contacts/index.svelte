<script>
  import SearchHeader from "$lib/components/SearchHeader.svelte";
  import ContactCard from '$lib/components/ContactCard.svelte'
  import BlurModal from '$lib/components/BlurModal.svelte'
  import NewContactForm from "$lib/components/NewContactForm.svelte";

  export let contacts
  let showModal = false

  let searchMenu

  const handleToggleModal = () => {
    showModal = !showModal
  }
</script>

<div class:blurred={searchMenu} class='w-full overflow-y-hidden'>
  <SearchHeader title={'Contacts'} bind:showModal bind:searchMenu children={contacts} />
  <div class="my-10 mx-3">
    {#each contacts as contact}
      <a href={`/contacts/${contact.contact_id}`}>
        <ContactCard {contact} />
      </a>
    {/each}
  </div>

  <BlurModal 
    open={showModal}
    title={false}
    on:close={handleToggleModal}
  >
    <svelte:fragment slot="body">
      <NewContactForm bind:showModal/>
    </svelte:fragment>
  </BlurModal>
</div>

<style lang="postcss">
  .blurred {
    @apply
      bg-black 
      opacity-75;
  }
</style>