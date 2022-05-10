<script>
  import CollabCard from '$lib/components/CollabCard.svelte'
  import Card from '$lib/components/Card.svelte'
  import BlurModal from '$lib/components/BlurModal.svelte';
  import { goto } from '$app/navigation';

  export let contact
  export let deals
  export let team

  let imgSrc = `/avatars/${contact.contact_id}.jpg` 

  let editSocials, editEmail, editPhone, moreOptionsModal= false
  let showMoreOptions = true
  let editAbout = false
  let editContact = false
  
  let blur = false

  let newSocials, tempEmail, tempPhone
  tempEmail = contact.email
  newSocials = contact.socials
  // newSocials.map(social => social.contact_id = contact.contact_id)
  tempPhone = contact.phone

  let socialChoices = ['Instagram', 'TikTok', 'Twitter', 'Youtube']

  const activeDeals = deals.filter(deal => deal.active === 1)
  const archivedDeals = deals.filter(deal => deal.active === 0)

  const handleNewSocial = () => {
    newSocials.push({
      social_id: null,
      contact_id: contact.contact_id,
      platform: '',
      url: '',
      followers: '100k'
    })

    newSocials = newSocials
  }

  const editSocial = async () => {
    
    blur = false
    editSocials = false
    await fetch(`/api/editSocial`, {method: 'PUT', body: JSON.stringify({socials: newSocials})})
    
  }

  const deleteSocial = async (id) => {
    await fetch(`/api/editSocial?id=${id}&contact=${contact.contact_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(res => res.json()).then(json => {
      console.log(json)
      contact = json.contact
      // socials = json.socials 
      newSocials = contact.socials
    }).catch(err => console.log(err))
  }

  const handleMoreOptions = () => showMoreOptions = !showMoreOptions

  const deleteContact = async () => {
    await fetch(`/contacts/${contact.contact_id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => goto('/contacts')).catch(err => console.log("error", err))
  }

  const handleEditAbout = async () => {
    // contact.category = tempCategory
    // contact.intro = tempIntro
    // contact.description = tempDescription
    // contact.location = tempLocation
    await fetch(`/contacts/${contact.contact_id}`, {method: 'PUT', body: JSON.stringify(contact)})
    editAbout = false
    blur = false
  }

  const handleEditContact = () => {}
</script>

<div class="text-brandWhite mx-3" class:blur-sm={blur}>
  <div class="flex items-center p-2">
    <div class="flex-1 flex items-center">
      <div class="bg-white w-10 h-10 rounded-full flex justify-center items-center">
        <p class="text-black font-bold font-header">{contact.firstname[0]}{contact.lastname[0]}</p>
      </div>
      <p class="mx-2 text-2xl font-bold italic font-header">{contact.firstname} {contact.lastname}</p>
    </div>
    <div class="block">
      <input type="button" value="More Options +" class="bg-brandTeal p-2 rounded-xl" on:click={handleMoreOptions}/>
      <!-- FIX -->
      <ul class:hidden={showMoreOptions} class="block text-center">
        <li class='mt-1'><input class='bg-red-400 p-1 rounded-lg hover:bg-red-300' type="button" value="Delete Contact" on:click|preventDefault={() => moreOptionsModal = true}/></li>
      </ul>
    </div>
    
  </div>
  <!--  -->
  <div class="sm:grid sm:grid-cols-12 gap-2 my-5 flex flex-col">
    <div class="col-span-7">
      <div class="bg-slate-800 rounded-xl flex flex-col items-center justify-center p-10">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">
          <img src={imgSrc} class="rounded-full" alt="" />
        </div>
        <p class="font-bold text-2xl pt-3 font-header">{contact.firstname} {contact.lastname}</p>
      </div>

      <div class="bg-slate-800 mt-3 pb-5 rounded-xl">

        {#if deals.length > 0}
          <p class="text-white text-2xl p-2 font-header">Deals</p>
          <div class="sm:grid sm:grid-cols-2 flex flex-col gap-2">
            <!-- active -->
            <div class="px-2">
              <p class="text-xs text-gray-400">ACTIVE</p>
              {#each activeDeals as deal}
              <CollabCard deal={deal} contact={contact} owner={team.find(owner => owner.user_id === deal.owner_id)} />
              {/each}
            </div>
            <!-- archived -->
            {#if archivedDeals.length > 0}
              <div class="px-2">
                <p class="text-xs text-gray-400">ARCHIVED</p>
                {#each archivedDeals as deal}
                <CollabCard deal={deal} contact={contact} owner={team.find(owner => owner.user_id === deal.owner_id)}/>
                {/each}
              </div>
            {/if}
          </div>
        {:else}
        <p class="text-white text-2xl p-2 text-center">No Current Deals</p>
        {/if}
      </div>
    </div>
    <div class="sm:col-span-5 flex flex-col gap-2">
      <Card>
        <svelte:fragment slot="body">
          <div class="flex items-center justify-between">
            <h4 class="text-lg my-1 font-header">About</h4>
            <span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => {editAbout = true, blur = true}}>EDIT</span>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">CATEGORY</h6>
              <h6 class="text-xs my-1">{contact.category}</h6>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">INTRO</h6>
              <h6 class="text-xs my-1">{contact.intro ? contact.intro : 'No Intro'}</h6>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">DESCRIPTION</h6>
              <h6 class="text-xs my-1">{contact.description ? contact.description : 'No Description'}</h6>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <h6 class="text-xs text-gray-400 my-2">LOCATION</h6>
              <h6 class="text-xs my-1">{contact.location ? contact.location : 'Not Set'}</h6>
            </div>
          </div>
          
        </svelte:fragment>
      </Card>
        
      <Card>
        <svelte:fragment slot="body">
          <h4 class="text-lg my-1 font-header">Socials<span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => {editSocials = true, blur = true}}>EDIT</span></h4>
          <p class="text-xs text-gray-400">SOCIALS</p>
          {#each newSocials as social}
            <div class="grid grid-cols-3 gap-2 my-1">
               <!-- no icons currently  -->
                <p class="text-xs">{social.platform}</p>
                <p class="text-xs">{social.followers ? social.followers : "100k"} Followers</p>
                <p class="text-xs">{'50% Engagement'}</p>
            </div>
          {/each}
        </svelte:fragment>
      </Card>
        
        <Card>
          <svelte:fragment slot="body">
              <h4 class="text-lg my-1 font-header">Contact<span class="text-xs text-brandTeal float-right hover:cursor-pointer" on:click={() => {editContact = true, blur = true}}>EDIT</span></h4>
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
<BlurModal open={editAbout} on:close={() => {editAbout = false, blur = false}} title={'Edit Contact'}> 
  <svelte:fragment slot="body">
    <div class="">
      <div class="my-1">
        <label for="category" class="text-gray-200">Category</label>
        <input id="category" name="category" type="text" class="bg-gray-600 p-2 rounded-lg w-full text-white" bind:value={contact.category} placeholder={'Ex: Influencer'} />
      </div>
      <div class="my-1">
        <label for="intro" class="text-gray-200">Intro</label>
        <input id="intro" name="intro" type="text" class="bg-gray-600 p-2 rounded-lg w-full text-white" bind:value={contact.info} placeholder={'Add Intro'} />
      </div>
      <div class="my-1">
        <label for="description" class="text-gray-200">Description</label>
        <input id="description" name="description" type="text" class="bg-gray-600 p-2 rounded-lg w-full text-white" bind:value={contact.description} placeholder={'Add Description'} />
      </div>
      <div class="my-1">
        <label for="location" class="text-gray-200">Location</label>
        <input id="location" name="location" type="text" class="bg-gray-600 p-2 rounded-lg w-full text-white" bind:value={contact.location} placeholder={'Add Location'} />
      </div>
        <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={handleEditAbout}>
    </div>
  </svelte:fragment>
</BlurModal>

<!-- edit socials -->
<BlurModal open={editSocials} on:close={() => {editSocials = false, blur = false}} title={'About'}>
  <svelte:fragment slot="body">
    <div>
     <!-- Need to make a select input -->
     <h6 class='text-gray-400 my-2'>SOCIALS</h6>
      <!--  -->
      {#each newSocials as value, index}
        <div class="w-full flex justify-between">
          <select bind:value={value.platform} class="m-1 p-2 rounded-lg bg-slate-700 text-brandWhite text-sm">
            {#each socialChoices as social}
            <option value={social}>{social}</option>
            {/each}
          </select>
          <input type="text" class="my-1 p-2 rounded-lg bg-slate-700 text-brandWhite text-sm flex-1" bind:value={value.url} placeholder='ex: http://www.youtube.com/mrbeast' />
          <button class="p-1 rounded-full m-4" on:click={() => deleteSocial(value.social_id)}>
            <svg height="15px" viewBox="0 0 24 24" width="24px" fill="#52c0cc"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
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
</BlurModal>

<!-- edit email -->
<BlurModal open={editContact} on:close={() => {editContact = false, blur = false}} title={'Edit Contact'}>
  <svelte:fragment slot="body">
    <div class="">
      <div class="my-1">
        <label for="email" class="text-gray-200">Email</label>
        <input id="email" name="eamil" type="email" class="bg-gray-600 p-2 rounded-lg w-full text-white" bind:value={tempEmail} placeholder={'ex: mail@mail.com'} />
      </div>
      <div class="my-1">
        <label for="phone" class="text-gray-200">Phone</label>
        <input id="phone" name="phone" type="text" class="bg-gray-600 p-2 rounded-lg w-full text-white" bind:value={tempPhone} placeholder={'XXX-XXX-XXXX'} />
      </div>
        <input type="button" class="p-2 rounded-lg bg-brandTeal w-full mt-10" value="SAVE" on:click={handleEditContact}>
    </div>
  </svelte:fragment>
</BlurModal>

<!-- more options/delete contact change to dropdown-->
<BlurModal open={moreOptionsModal} on:close={() => moreOptionsModal = false} title={'Delete Contact'}>
  <svelte:fragment slot="body">
    <div>
      <div class="bg-slate-700 rounded-xl flex flex-col items-center justify-center p-10">
        <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black text-2xl font-bold">{contact.firstname[0]}{contact.lastname[0]}</div>
        <p class="font-bold text-white text-2xl pt-3">{contact.firstname} {contact.lastname}</p>
      </div>
      <p class='text-gray-300 text-center my-3 '>Are you sure you want to delete this contact?</p>
      <input type="button" value="Delete" class='bg-red-500 text-white text-xl p-2 w-full rounded-xl' on:click|preventDefault={deleteContact}/>
    </div>
  </svelte:fragment>
</BlurModal>
