<script>
  import ContactCard from "$lib/components/ContactCard.svelte";
  const contact = {
    name: 'Arlene Dunnigan',
    status: 'lead',
    littleBubble: 'TS'
  }
</script>

<ContactCard contact={contact}/>