<script>
  import Card from '$lib/components/Card.svelte'
  import Modal from '$lib/components/Modal.svelte'
  export let user
  export let company
  export let team

  let isRemoveModalOpen = true
  let i 
  const handleRemoveTeamMember = () => {
    const temp = team
    temp.splice(i, 1)
    team = temp
    isRemoveModalOpen = false
  }
</script>

<div class='grid sm:grid-cols-12 gird-cols-13'>
  <div class="col-span-8">
      <Card>
        <svelte:fragment slot="body">
          <div class="">
            <p class="font-bold">Profile</p>
            <h6 class="text-xs text-gray-400">Name</h6>
            <h5 class='text-xs'>{user.firstName} {user.lastName}</h5>
          </div>
          <div class="">
            <a href="/settings/edit/[user]" class="text-xs text-brandTeal">EDIT</a>
          </div>
        </svelte:fragment>
      </Card>
    {#if team}
      <div class="mt-10">
          {#each team as member, index}
            <Card>
              <svelte:fragment slot="body">
                <!-- <div class=""> -->
                  <div class="h-10 w-10 bg-brandWhite rounded-full col-span-1" />
                  <p class="text-xs col-span-2">{member.firstName} {member.lastName}</p>
                  <p class="text-xs col-span-1">{member.role}</p>
                  <p class="text-xs col-span-1">{member.email}</p>
                  <p class="text-xs col-span-1 col-start-6">{'xxx'}</p>
                  {#if user.role === 'ADMIN'}
                    <input type="button" value="Remove" class="text-red-500 text-xs col-span-1" on:click={() => {isRemoveModalOpen = true
                    i = index}}/>
                  {/if}
                <!-- </div> -->
              </svelte:fragment>
            </Card>
          {/each}
        </div>
      {/if}

  </div>
  <Modal open={isRemoveModalOpen} on:close={() => isRemoveModalOpen = false}>
    <svelte:fragment slot="body">
      <h1 class="text-brandWhite text-center text-2xl font-bold">Are you sure you want to remove this member?</h1>
      <div class='flex justify-around m-10'>
        <input type="button" value='CANCEL' class="bg-red-400 p-5 rounded-2xl" on:click|preventDefault={() => isRemoveModalOpen = false}/>
        <input type="button" value='CONTINUE' class='bg-brandTeal p-5 rounded-2xl' on:click|preventDefault={handleRemoveTeamMember}/>
      </div>
    </svelte:fragment>
  </Modal>
</div>