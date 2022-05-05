<script>
  import SearchHeader from "$lib/components/SearchHeader.svelte";
  import ContactCard from '$lib/components/ContactCard.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import NewContactForm from "$lib/components/NewContactForm.svelte";

  export let contacts
  let showModal = false

  const handleToggleModal = () => {
    showModal = !showModal
  }
</script>

<div>
  <SearchHeader title={'Contacts'} bind:showModal />
  <div class="my-10 mx-3">
    {#each contacts as contact}
      <a href={`/contacts/${contact.contact_id}`}>
        <ContactCard {contact} />
      </a>
    {/each}
  </div>

  <Modal 
    open={showModal}
    title={false}
    on:close={handleToggleModal}
  >
    <svelte:fragment slot="body">
      <NewContactForm bind:showModal/>
    </svelte:fragment>
</Modal>
</div>