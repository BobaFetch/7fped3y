<script>
  export let title
  export let searchParams = ''

  export let showModal = false
  let page = title.split('').slice(0, -1).join('')

  const handleToggleModal = () => {
    showModal = !showModal
  }
</script>

<div class="flex flex-row w-full mb-3 static">
  <h4 class="text-brandWhite text-2xl ">{title}</h4>
  <input type="text" bind:value={searchParams} placeholder={`Search ${title}`} class="mx-auto rounded-xl w-1/2 sm:w-72 text-center" />
  <input type="button" value={`+ Add a ${page}`} class="bg-brandTeal rounded p-2 cursor-pointer" on:click|preventDefault={handleToggleModal} />
</div>