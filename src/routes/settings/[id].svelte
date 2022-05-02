<script>
  import {authenticated} from '$lib/stores/tempStore'
  import { goto } from '$app/navigation';
  import Card from '$lib/components/Card.svelte'
  import TeamCard from '$lib/components/TeamCard.svelte'
  import Modal from '$lib/components/Modal.svelte'
  import EditUser from '$lib/components/EditUser.svelte'
  import EditContact from '$lib/components/EditContact.svelte'

  export let user
  export let team

  let isRemoveModalOpen = false
  let isEditModalOpen = false
  let isContactModalOpen = false 
  let isPhoneModalOpen = false

  let selected 
  let i 
  let toBeDeleted = team
  let newOwner

  const handleLogout = () => {
    $authenticated = false 
    goto('/auth')
  }

  const handleRemoveTeamMember = (member) => {
    toBeDeleted = member
    isRemoveModalOpen = true
  }

  //quick and dirty
  const handleNewPhone = (number) => {
    user.phone = number
    isPhoneModalOpen = false
  }

  const handleNewOwner = () => {

  }

  const handleSearch = (array, params) => {
    
  }
  
</script>

<div class="mx-3">
  <div class="flex justify-between mb-3">
    <h1 class="text-2xl text-gray-300 font-header">Settings</h1>
    <input type="button" value="Logout" class="bg-brandTeal p-2 cursor-pointer rounded-lg" on:click|preventDefault={handleLogout} />
  </div>
  <div class='sm:grid sm:grid-cols-12 flex flex-col gap-2'>
    <!-- LEFT SIDE -->
    <div class="col-span-8">
      <Card>
        <svelte:fragment slot="body">
          <div class="flex justify-between">
            <div class="">
              <p class="font-bold font-header my-1">Profile</p>
              <h6 class="text-xs text-gray-400">Name</h6>
              <h5 class='text-xs'>{user.firstname} {user.lastname}</h5>
            </div>
            <div class="">
              <input type="button" class="text-xs text-brandTeal" value="EDIT" on:click={() => isEditModalOpen = true} />
            </div>
          </div>
        </svelte:fragment>
      </Card>
      {#if team}
      <div class="mt-10">
        <h4 class="text-brandWhite text-xl font-bold p-2 font-header">TEAM</h4>
        {#each team as member, index}
        <TeamCard 
        bind:isRemoveModalOpen
        user={user} 
        index={index}
        {i}
        bind:member
        on:delete={() => handleRemoveTeamMember(member)}
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
          <h6 class="text-xs my-1">{user.company.name}</h6>
        </svelte:fragment>
      </Card>
      <Card>
        <svelte:fragment slot="body">
          <h4 class="text-lg my-1">Role</h4>
          <h6 class="text-xs text-gray-400 my-2">YOUR ROLE</h6>
          <h6 class="text-xs my-1">{user.role}</h6>
          <h6 class="text-xs text-gray-400 my-2">COMPANY ADMIN</h6>
          {#each team.filter(m => m.role === 'Admin') as admin}
          <h6 class="text-xs my-1">
            {admin.firstname} {admin.lastname}
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
  </div>
    
    <!-- MODALS -->
    
    <!-- REMOVE TEAM MEMBER MODAL -->
    <Modal open={isRemoveModalOpen} title={'Delete Team Member'} on:close={() => isRemoveModalOpen = false}>
      <svelte:fragment slot="body">
        <div class="bg-blue-800 text-white flex flex-col items-center justify-around p-8 mb-5">
        <div class="w-20 h-20 bg-white rounded-full flex items-center justify-center my-2" ><p class="text-black text-5xl text-center">{toBeDeleted.firstName[0]}{toBeDeleted.lastName[0]}</p></div>
        <p class="my-2">{toBeDeleted.firstName} {toBeDeleted.lastName}</p>
      </div>
      <p class="text-gray-400 text-sm text-center my-3">Before deleting this contact, who will take over their deals?</p>
      <p class="text-gray-400 my-3 text-sm">NEW OWNER</p>
      <div class="bg-blue-800 text-white flex items-center justify-start mx-auto rounded-lg mt-2">
        <input type="search" bind:value={user.firstName} placeholder={''} class="w-full p-2 rounded-lg bg-blue-800" />
      </div>
      <div class='flex justify-around m-10'>
        <!-- <input type="button" value='CANCEL' class="bg-red-400 p-5 rounded-2xl" on:click|preventDefault={() => isRemoveModalOpen = false}/> -->
        <input type="button" value='Delete Team Member & Transfer Ownership' class='bg-red-600 p-5 rounded-2xl text-white' on:click|preventDefault={handleRemoveTeamMember}/>
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