<script>
  import SearchHeader from "$lib/components/SearchHeader.svelte";
  import ContactCard from '$lib/components/ContactCard.svelte'
  import data from '$lib/mock_data.json'

</script>

<div>
  <SearchHeader title={'Contacts'} />
  <div class="my-10">
    {#each data as contact}
      <ContactCard {contact} />
    {/each}
  </div>
</div>