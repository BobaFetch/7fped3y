<script>
  import {authenticated} from '$lib/stores/tempStore'
  import { goto } from '$app/navigation';
  import Card from '$lib/components/Card.svelte'
  import TeamCard from '$lib/components/TeamCard.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import EditUser from '$lib/components/EditUser.svelte'
  import EditContact from '$lib/components/EditContact.svelte'

  export let user
  export let company
  export let team

  let isRemoveModalOpen = false
  let isEditModalOpen = false
  let isContactModalOpen = false 
  let isPhoneModalOpen = false

  let selected
  let i 

  const handleLogout = () => {
    $authenticated = false 
    goto('/auth')
  }

  const handleRemoveTeamMember = () => {
    const temp = team
    temp.splice(i, 1)
    team = temp
    isRemoveModalOpen = false
  }

  //quick and dirty
  const handleNewPhone = (number) => {
    user.phone = number
    isPhoneModalOpen = false
  }
  
</script>

<div class="flex">
  <h1 class="text-2xl text-brandWhite font-bold my-2 flex-1">SETTINGS</h1>
  <input type="button" value="Logout" class="bg-brandTeal px-5 m-2 rounded-xl" on:click|preventDefault={handleLogout} />
</div>
<div class='grid sm:grid-cols-12 gird-cols-13 '>
  <!-- LEFT SIDE -->
  <div class="col-span-8">
      <Card>
        <svelte:fragment slot="body">
          <div class="">
            <p class="font-bold">Profile</p>
            <h6 class="text-xs text-gray-400">Name</h6>
            <h5 class='text-xs'>{user.firstName} {user.lastName}</h5>
          </div>
          <div class="">
            <input type="button" class="text-xs text-brandTeal" value="EDIT" on:click={() => isEditModalOpen = true} />
          </div>
        </svelte:fragment>
      </Card>
    {#if team}
      <div class="mt-10">
        <h4 class="text-brandWhite text-xl font-bold p-2">TEAM</h4>
          {#each team as member, index}
            <TeamCard 
              bind:isRemoveModalOpen
              user={user} 
              index={index}
              {i}
              bind:member
            />
          {/each}
        </div>
      {/if}
  </div>

  <!-- RIGHT COLUMN -->
  <div class="col-span-4">
    <Card>
      <svelte:fragment slot="body">
        <h4 class="text-lg my-1">Company</h4>
        <h6 class="text-xs text-gray-400 my-2">NAME</h6>
        <h6 class="text-xs my-1">{company.name}</h6>
      </svelte:fragment>
    </Card>
    <Card>
      <svelte:fragment slot="body">
        <h4 class="text-lg my-1">Role</h4>
        <h6 class="text-xs text-gray-400 my-2">YOUR ROLE</h6>
        <h6 class="text-xs my-1">{user.role}</h6>
        <h6 class="text-xs text-gray-400 my-2">COMPANY ADMIN</h6>
        {#each team.filter(m => m.role === 'ADMIN') as admin}
        <h6 class="text-xs my-1">
          {admin.firstName} {admin.lastName}
        </h6>
        {/each}
      </svelte:fragment>
    </Card>
    <Card>
      <svelte:fragment slot="body">
        <h4 class="text-lg my-1">Contact<span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => isContactModalOpen = true}>EDIT</span></h4>
        <h6 class="text-xs text-gray-400 my-2">EMAIL</h6>
        <h6 class="text-xs my-1">{user.email}</h6>
        <h6 class="text-xs text-gray-400 my-2">PHONE</h6>
        {#if user.phone}
          <h6 class="text-xs my-1">{user.phone}</h6>
        {:else}
          <input type="button" value="+ Add a Phone Number" class="text-brandTeal text-xs" on:click|preventDefault={() => isPhoneModalOpen = true}>
        {/if}
      </svelte:fragment>
    </Card>
  </div>

  <!-- MODALS -->

  <!-- REMOVE TEAM MEMBER MODAL -->
  <Modal open={isRemoveModalOpen} title={false} on:close={() => isRemoveModalOpen = false}>
    <svelte:fragment slot="body">
      <h1 class="text-brandWhite text-center text-2xl font-bold">Are you sure you want to remove this member?</h1>
      <div class='flex justify-around m-10'>
        <input type="button" value='CANCEL' class="bg-red-400 p-5 rounded-2xl" on:click|preventDefault={() => isRemoveModalOpen = false}/>
        <input type="button" value='CONTINUE' class='bg-brandTeal p-5 rounded-2xl' on:click|preventDefault={handleRemoveTeamMember}/>
      </div>
    </svelte:fragment>
  </Modal>

  <!-- EDIT PROFILE MODAL -->
  <Modal open={isEditModalOpen} on:close={() => isEditModalOpen = false} title={false}>
    <svelte:fragment slot="body">
      <EditUser bind:isEditModalOpen bind:user />
    </svelte:fragment>
  </Modal>

  <!-- EDIT CONTACT MODAL -->
  <Modal open={isContactModalOpen} on:close={() => isContactModalOpen = false} title={false}> 
    <svelte:fragment slot="body">
      <EditContact bind:isContactModalOpen bind:user />
    </svelte:fragment>
  </Modal>

  <Modal open={isPhoneModalOpen} on:close={() => isPhoneModalOpen = false} title={false}>
    <svelte:fragment slot="body">
      <div>
        <h4 class="text-brandWhite text-3xl font-bold mb-5">ADD PHONE NUMBER</h4>
        <h4 class="text-sm text-gray-400">PHONE</h4>
        <input type="text" class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm w-full my-2" bind:value={user.phone} placeholder="XXX-XXX-XXXX"/> 
        <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={() => handleNewPhone(user.phone)}>
      </div>
    </svelte:fragment>
  </Modal>
</div>