<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte'
  export let title
  let children

  export let showModal = false
  let page = title.split('').slice(0, -1).join('')

  const handleToggleModal = () => {
    showModal = !showModal
  }

  

  onMount(async () => {
    //get the correct data
    const res = await fetch(`/api/search?query=${title}`, {
      method: 'GET',
      mode: 'cors'
    })
    if (res.ok) {
      let {data} = await res.json()
      children = data
    }
  })

  const doSomething = (e) => {
    const h = children.filter(d => d.name === e.target.value)
    if (h.length > 0) {
      goto(`/${title.toLowerCase()}/${h[0].id}`)
    }
  }

</script>

<div class="flex flex-row justify-between w-full mb-3 px-3">
  <h4 class="text-gray-300 text-2xl font-header ">{title}</h4>
  
  <div class="relative">
    <input type="search" 
      placeholder={`Search ${title}`} 
      class="mx-auto rounded-xl w-1/2 sm:w-72 p-2 bg-slate-600 text-gray-200" 
      list="search-data"
      on:change={doSomething}
    />
    <datalist id="search-data" >
      {#if children}
        {#each children as temp}
          <option value={temp.name} />
        {/each}
      {/if}
    </datalist>
  </div>
 
  <input type="button" value={`+ Add a ${page}`} class="bg-brandTeal rounded p-2 cursor-pointer" on:click|preventDefault={handleToggleModal} />
</div>