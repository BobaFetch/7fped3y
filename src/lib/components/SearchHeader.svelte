<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte'
  export let title
  export let options

  let children
  let searchMenu = false

  console.log('options', options)


  let searchParams

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
      console.log('children', children)
    }
  })

  const doSomething = () => {
    console.log(searchParams)
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
    <ul class='bg-white absolute w-full' class:hidden={!searchMenu} on:mouseleave={() => searchMenu = false}>
      {#each options as option}
        <li class='hover:bg-brandTeal' on:click={() => console.log(option)}>{option.dealName}</li>
      {/each}
    </ul>
  </div>
 
  <input type="button" value={`+ Add a ${page}`} class="bg-brandTeal rounded p-2 cursor-pointer" on:click|preventDefault={handleToggleModal} />
</div>
