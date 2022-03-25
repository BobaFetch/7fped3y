<script>
  import SearchHeader from "$lib/components/SearchHeader.svelte";
  import ContactCard from '$lib/components/ContactCard.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import NewContactForm from "$lib/components/NewContactForm.svelte";
  import contacts from '$lib/mock_contacts.json'

  let showModal = false

  const handleToggleModal = () => {
    showModal = !showModal
  }
</script>

<div>
  <SearchHeader title={'Contacts'} bind:showModal />
  <div class="my-10">
    {#each contacts as contact}
      <ContactCard {contact} />
    {/each}
  </div>

  <Modal 
    open={showModal}
    on:close={handleToggleModal}
  >
  <svelte:fragment slot="body">
    <NewContactForm bind:showModal/>
  </svelte:fragment>
</Modal>
</div>