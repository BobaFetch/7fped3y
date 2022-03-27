<script>
  export let user
  export let isContactModalOpen
  let userEdit = user
  let editStep = 1

  const handleEditStep = () => {
    editStep += 1
  }

  const handleSave = () => {
      user = userEdit
      isContactModalOpen = false
  }
</script>
  {#if editStep === 1}
    <div>
      <h4 class="text-brandWhite text-3xl font-bold mb-5">EDIT EMAIL</h4>
      <h4 class="text-sm text-gray-400">EMAIL</h4>
      <input type="text" class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm w-full my-2" bind:value={userEdit.email} /> 
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="NEXT" on:click={handleEditStep}>
    </div>
  {:else if editStep === 2}
  <div>
    <h4 class="text-brandWhite text-3xl font-bold mb-5">EDIT PHONE</h4>
    <h4 class="text-sm text-gray-400">PHONE</h4>
    <input type="text" class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm w-full my-2" bind:value={userEdit.phone} placeholder="XXX-XXX-XXXX"/> 
    <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={handleSave}>
  </div>
  {/if}
