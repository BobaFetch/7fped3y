<script>
  export let user
  export let isEditModalOpen
  let userEdit = user

  const handleSave = () => {
      user = userEdit
      isEditModalOpen = false
  }
</script>

    <div>
      <h4 class="text-brandWhite text-3xl font-bold mb-5">EDIT NAME</h4>
      <h4 class="text-sm text-gray-400">NAME</h4>
      <input type="text" class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm w-full my-2" bind:value={userEdit.firstName} />
      <input type="text" class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm w-full my-2" bind:value={userEdit.lastName} />
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={handleSave}>
    </div>
  