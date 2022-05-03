<script>
  import { flip } from 'svelte/animate'
  import { dndzone } from 'svelte-dnd-action'

  import CollabCard from '$lib/components/CollabCard.svelte'

  export let columns;
  export let contacts
  let flipDurationMs = 200

  const handleColumns = e => columns = e.detail.items;

  const handleCards = (id, e) => {
    const colIndex = columns.findIndex(c => c.id === id);
    columns[colIndex].items = e.detail.items;
    columns = [...columns]
  }


</script>

<section 
  use:dndzone={{items: columns, flipDurationMs, type: "columns"}}
  on:consider={handleColumns} on:finalize={handleColumns}
  class="flex flex-row overflow-auto py-5 mx-3 h-screen"
>
  {#each columns as column (column.id)}
    <div animate:flip={{duration: flipDurationMs}} class="mx-3">
      <div class="flex justify-between">
        <div class="text-gray-300 font-header">{column.title}</div>
        <div class="text-gray-500 hover:text-gray-300 text-xs">{column.items.length}</div>
      </div>
      <div
        class="h-full"
        use:dndzone={{items: column.items, flipDurationMs}}
        on:consider={(e) => handleCards(column.id, e)} on:finalize={(e) => handleCards(column.id, e)}
      >
      {#if column.items.length > 0 }
        {#each column.items as item (item.id)}
          <div animate:flip={{duration: 200}} class="text-white">
              <CollabCard deal={item} contact={contacts.find(contact => contact.contact_id === item.client_id)} />
          </div>
        {/each}
      {:else}
      <div class="text-white">
        <CollabCard deal={null} contact={null} />
      </div>
      {/if}
      </div>
    </div>
  {/each}
</section>