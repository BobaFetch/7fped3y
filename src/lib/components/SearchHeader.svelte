<script>
  export let title

  export let children
  export let searchMenu = false


  let searchParams = ''

  export let showModal = false
  let page = title.split('').slice(0, -1).join('')

  const handleToggleModal = () => {
    showModal = !showModal
  }

</script>

<div class="flex flex-row justify-between w-full mb-3 px-3">
  <h4 class="text-gray-300 text-2xl font-header ">{title}</h4>
  
  <div class="relative">
    <input type="text" 
      placeholder={`Search ${title}`} 
      class="mx-auto rounded-xl w-1/2 sm:w-72 p-2 bg-slate-600 text-gray-200" 
      list="search-data"
      bind:value={searchParams}
      on:focus={() => searchMenu = true}
      on:click={() => searchMenu = true}
    />
    <ul class='bg-slate-600 text-white absolute w-full max-h-52 overflow-auto rounded-lg' class:hidden={!searchMenu} on:mouseleave={() => searchMenu = false}>
      {#if title === 'Collabs'}
        {#each children.filter(op => op.dealName.toLowerCase().includes(searchParams.toLowerCase())) as option}
          <li class='hover:bg-brandTeal p-1' on:click={() => console.log(option)}><a href={`/collabs/${option.deal_id}`}>{option.dealName}</a></li>
        {/each}
      {:else if title === 'Contacts'}
        {#each children.filter(op => op.firstname.toLowerCase().includes(searchParams.toLowerCase())) as option}
          <li class='hover:bg-brandTeal p-1 flex items-center' on:click={() => console.log(option)}>
            <img src={`/avatars/${option.contact_id}.jpg`} class='w-8 h-8 mr-2 rounded-full' alt='avatar' />
            <a href={`/contacts/${option.contact_id}`}>{option.firstname} {option.lastname}</a>
          </li>
        {/each}
      {/if}
    </ul>
  </div>
 
  <input type="button" value={`+ Add a ${page}`} class="bg-brandTeal rounded p-2 cursor-pointer" on:click|preventDefault={handleToggleModal} />
</div>
