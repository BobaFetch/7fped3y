<script>
  import DealsCard from '$lib/components/DealsCard.svelte'
  import Card from '$lib/components/Card.svelte'
  import Modal from '$lib/components/Modal.svelte'

  export let contact
  export let deals
  export let team

  const testData = {
    platform: 'Youtube',
    url: 'http://youtube.com'
  }


  let editCategory, editIntro, editDescription, editLocation, editSocials, editEmail, editPhone = false

  editPhone = false
  //temp variables
  let tempCategory, tempIntro, tempDescription, tempLocation, tempSocials, tempEmail, tempPhone
  tempEmail = contact.email
  tempSocials = JSON.parse(contact.socials)
  tempPhone = contact.phone

  let socials = ['Instagram', 'TikTok', 'Twitter']

  const activeDeals = deals.filter(deal => deal.active === 1)
  const archivedDeals = deals.filter(deal => deal.active === 0)

  const handleNewSocial = () => {
    tempSocials.push({
      client_id: contact.contact_id,
      platform: '',
      url: '',
      followers: ''
    })

    tempSocials = tempSocials
  }

  const editSocial = async () => {
    await fetch('/api/editSocial', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(tempSocials)
    }).then(() => {
      editSocials = false 
      // console.log(tempSocials)
      //
    })
  }
</script>

<div class="text-brandWhite">
  <div class="flex items-center p-2">
    <div class="flex-1 flex items-center">
      <div class="bg-white w-10 h-10 rounded-full flex justify-center items-center">
        <p class="text-black font-bold">{contact.firstName[0]}{contact.lastName[0]}</p>
      </div>
      <p class="mx-2 text-2xl font-bold italic">{contact.firstName} {contact.lastName}</p>
    </div>
    <input type="button" value="More Options +" class="bg-brandTeal p-2 rounded-xl" />
  </div>
  <!--  -->
  <div class=" grid grid-cols-12 gap-2 my-5">
    <div class="col-span-7">
      <div class="bg-blue-900 rounded-xl flex flex-col items-center justify-center p-10">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">{contact.firstName[0]}{contact.lastName[0]}</div>
        <p class="font-bold text-2xl pt-3">{contact.firstName} {contact.lastName}</p>
      </div>

      <div class="bg-blue-900 mt-3 rounded-xl">

        {#if deals}
          <p class="text-white text-2xl p-2">Deals</p>
          <div class="grid grid-cols-2 gap-2">
            <!-- active -->
            <div class="px-2">
              <p class="text-xs text-gray-400">ACTIVE</p>
              {#each activeDeals as deal}
              <DealsCard deal={deal} contact={contact} owner={team.find(owner => owner.user_id === deal.owner_id)} />
              {/each}
            </div>
            <!-- archived -->
            <div class="px-2">
              <p class="text-xs text-gray-400">ARCHIVED</p>
              {#each archivedDeals as deal}
              <DealsCard deal={deal} contact={contact} owner={team.find(owner => owner.user_id === deal.owner_id)}/>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
    <div class="col-span-5">
      <Card>
        <svelte:fragment slot="body">
          <h4 class="text-lg my-1">About</h4>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">CATEGORY</h6>
              <h6 class="text-xs my-1">{contact.category}</h6>
            </div>
            <span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => editCategory = true}>EDIT</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">INTRO</h6>
              <h6 class="text-xs my-1">{contact.intro ? contact.intro : 'No Intro'}</h6>
            </div>
            <span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => editIntro = true}>EDIT</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">DESCRIPTION</h6>
              <h6 class="text-xs my-1">{contact.description ? contact.description : 'No Description'}</h6>
            </div>
            <span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => editDescription = true}>EDIT</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">LOCATION</h6>
              <h6 class="text-xs my-1">{contact.location ? contact.location : 'Not Set'}</h6>
            </div>
            <span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => editLocation = true}>EDIT</span>
          </div>
          
        </svelte:fragment>
      </Card>
        
      <Card>
        <svelte:fragment slot="body">
          <h4 class="text-lg my-1">Socials<span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => editSocials = true}>EDIT</span></h4>
          <p class="text-xs text-gray-400">SOCIALS</p>
          <!-- {#each contact.socials as social}
            <div class="grid grid-cols-3 gap-2 my-1">
               no icons currently 
                <p class="text-xs">{social.platform}</p>
                <p class="text-xs">{social.followers} Followers</p>
                <p class="text-xs">{'50% Engagement'}</p>
            </div>
          {/each} -->
        </svelte:fragment>
      </Card>
        
        <Card>
          <svelte:fragment slot="body">
              <h4 class="text-lg my-1">Contact<span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => editEmail = true}>EDIT</span></h4>
            <h6 class="text-xs text-gray-400 my-2">EMAIL</h6>
            <h6 class="text-xs my-1">{contact.email}</h6>
            <h6 class="text-xs text-gray-400 my-2">PHONE</h6>
            {#if contact.phone}
              <h6 class="text-xs my-1">{contact.phone}<span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => editPhone = true}>EDIT</span></h6>
            {:else}
              <input type="button" value="+ Add a Phone Number" class="text-brandTeal text-xs" on:click|preventDefault={() => editPhone = true}>
            {/if}
          </svelte:fragment>
        </Card>
      </div>
  </div>
</div>

<!-- MODALS -->
<!-- edit category -->
<Modal open={editCategory} on:close={() => editCategory = false} title={'Edit Category'}>
  <svelte:fragment slot="body">
    <div>
      <input type="text" class="bg-blue-800 p-2 rounded-lg w-full text-white" bind:value={tempCategory} placeholder={contact.category} />
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={() => {
        contact.category = tempCategory
        editCategory = false
      }}>
    </div>
  </svelte:fragment>
</Modal>

<!-- edit intro -->
<Modal open={editIntro} on:close={() => editIntro = false} title={'Edit Intro'}>
  <svelte:fragment slot="body">
    <div>
      <input type="text" class="bg-blue-800 p-2 rounded-lg w-full text-white" bind:value={tempIntro} placeholder={contact.intro ? contact.intro : 'Add Intro'} />
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={() => {
        contact.intro = tempIntro
        editIntro = false
      }}>
    </div>
  </svelte:fragment>
</Modal>

<!-- edit description -->
<Modal open={editDescription} on:close={() => editDescription = false} title={'Edit Description'}>
  <svelte:fragment slot="body">
    <div>
      <input type="text" class="bg-blue-800 p-2 rounded-lg w-full text-white" bind:value={tempDescription} placeholder={contact.description ? contact.description : 'Add Description'} />
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={() => {
        contact.description = tempDescription
        editDescription = false
      }}>
    </div>
  </svelte:fragment>
</Modal>

<!-- edit location -->
<Modal open={editLocation} on:close={() => editLocation = false} title={'Edit Location'}>
  <svelte:fragment slot="body">
    <div>
      <input type="text" class="bg-blue-800 p-2 rounded-lg w-full text-white" bind:value={tempLocation} placeholder={contact.location ? contact.location : 'Add Location'} />
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={() => {
        contact.location = tempLocation
        editLocation = false
      }}>
    </div>
  </svelte:fragment>
</Modal>

<!-- edit socials -->
<Modal open={editSocials} on:close={() => editSocials = false} title={'Edit Socials'}>
  <svelte:fragment slot="body">
    <div>
     <!-- Need to make a select input -->
     <h6 class='text-gray-400 my-2'>SOCIALS</h6>
      <!--  -->
      {#each tempSocials as value, index}
        <div class="w-full flex justify-between">
          <select bind:value={value.platform} class="m-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm">
            {#each socials as social}
            <option value={social}>{social}</option>
            {/each}
          </select>
          <input type="text" class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm flex-1" bind:value={value.url} placeholder='ex: http://www.youtube.com/mrbeast' />
          <button class="p-1 rounded-full m-4" on:click={() => {
            tempSocials.splice(index, 1) 
            tempSocials = tempSocials}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="24px" fill="#52c0cc"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
          </button>
        </div>
      {/each}
      <button class=" text-brandTeal text-xs text-left my-2" on:click|preventDefault={handleNewSocial}>+ Add a social channel</button>
      <!--  -->
      <div class='mt-8 flex justify-around '>  
        <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={editSocial}>
      </div>
    </div>
  </svelte:fragment>
</Modal>

<!-- edit email -->
<Modal open={editEmail} on:close={() => editEmail = false} title={'Edit Email'}>
  <svelte:fragment slot="body">
    <div>
      <input type="text" class="bg-blue-800 p-2 rounded-lg w-full text-white" bind:value={tempEmail} placeholder={tempEmail ? tempEmail : 'ex: mail@mail.com'} />
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" disabled={tempEmail ? false : true}
        on:click|preventDefault={() => {
          contact.email = tempEmail 
          editEmail = false
        }}>
    </div>
  </svelte:fragment>
</Modal>

<!-- edit phone -->
<Modal open={editPhone} on:close={() => editPhone = false} title={tempPhone ? 'Edit Phone Number' : 'Add Phone Number'}>
  <svelte:fragment slot="body">
    <div>
      <input type="text" class="bg-blue-800 p-2 rounded-lg w-full text-white" bind:value={tempPhone} placeholder={tempPhone ? tempPhone : 'XXX-XXX-XXXX'} />
      <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" disabled={tempPhone ? false : true}
        on:click|preventDefault={() => {
          contact.phone = tempPhone 
          editPhone = false
        }}>
    </div>
  </svelte:fragment>
</Modal>
