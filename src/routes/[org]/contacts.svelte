<script>
  import SearchHeader from "$lib/components/SearchHeader.svelte";
  import ContactCard from '$lib/components/ContactCard.svelte'
  import contacts from '$lib/mock_contacts.json'

</script>

<div>
  <SearchHeader title={'Contacts'} />
  <div class="my-10">
    {#each contacts as contact}
      <ContactCard {contact} />
    {/each}
  </div>
</div>