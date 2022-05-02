<script>
  import { createEventDispatcher, onMount } from "svelte";
  import {fly} from 'svelte/transition'
  import { goto } from "$app/navigation";
  // import ContactCard from "$lib/components/ContactCard.svelte";
  import BlurModal from "$lib/components/BlurModal.svelte";
  // import BlurModal from "$lib/BlurModal.svelte";

  const dispatch = createEventDispatcher()

  export let open = false
  let step = 0
  // modal on modal action
  let selectCreator = false
  let creators 
  let socials
  let selectedCreator = null
  let selectedSocials = null

  let newDeal = {
    contact_id: 0,
    owner_id: 0,
    team_id: 0,
    dealName: '',
    description: '',
    active: 1,
    status: 'Lead'
  }

  let deliverable = {deal_id: 0, description: '', delivered: 0, dueDate: ''}

  let deliverablesArray = [
    {
      deal_id: 0,
      description: '',
      delivered: 0,
      duedate: ''
    }
  ]

  const handleNewDeliverable = () => {
    deliverablesArray.push(deliverable)
    deliverablesArray = deliverablesArray
  }


  let stepContent = [
    {
      header: 'Add a New Deal',
      description: 'First, who is this deal for?'

    },
    {
      header: 'Add a Title',
      description: 'What should this deal be called?'
    },
    {
      header: 'Add a Description',
      description: 'Describe the details of this deal.'
    },
    {
      header: 'Add Deliverables',
      //Fix to dynamically display creator name without breaking 
      description: `What will {creator} be delivering for this deal`
    }
  ]

  const getCreators = async () => {
    await fetch('/api/creators')
    .then(res => res.json())
    .then(json => {
      creators = json.creators
      socials = json.socials
    }).then(() => console.log(selectedCreator))
    .catch(err => console.log(err))

    selectedCreator = creators[0]
    handleSocials(selectedCreator)
  }

  const handleSocials = (contact) => {
    selectedSocials = socials.filter(social => social.contact_id === contact.contact_id)
  }

  const handleAddDeal = async () => {
    console.log(selectedCreator)
    newDeal.contact_id = selectedCreator.contact_id
    newDeal.owner_id = selectedCreator.owner.user_id
    newDeal.team_id = selectedCreator.owner.company_id
    const res = await fetch(`/api/testdeal`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({newDeal, deliverablesArray})
    })
    if (res.ok) {
      let {lastInsertRowid} = await res.json()
      console.log(lastInsertRowid)
      deliverablesArray.map(del => del.deal_id = lastInsertRowid)
      await fetch('/api/deliverable', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(deliverablesArray)
      }).then(() => goto(`/deals/${lastInsertRowid}`))
    }

    deliverablesArray = [{deal_id: 0, description: '', dueDate: ''}]
  }

  onMount(() => {
    getCreators()
    console.log('open')
    //get previous deal_id  this is trash and only woeks one at a time
    fetch('/api/deliverable',
    {
      method: 'GET'
    }).then(res => res.json()).then(json => console.log(json))
  })
</script>

{#if open}
<div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0 blur-none">
  <!-- <div class="modal-overlay fixed w-full h-full bg-black opacity-75"></div> -->
  <div class="bg-gray-900 w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-lg shadow-brandTeal z-50 overflow-y-auto">
    <div class="flex items-start head text-2xl font-bold text-brandWhite justify-between">
      <div class='m-5'>
        <p class="text-xs text-gray-400 font-light">STEP {step+1} of 4</p>
        <h1 class="my-2 font-header">{stepContent[step].header}</h1>
        <p class="text-sm text-gray-400 mt-2 font-light">{stepContent[step].description}</p>
      </div>
      <button class="rounded-full m-2 " on:click={() => dispatch('close')}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
      </button>
    </div>
    {#if step === 0}
      <div in:fly={{x:200, duration: 200}} class="p-8">
          <!-- body content -->
        <div>
          {#if selectedCreator}
            <p class="text-gray-400 text-xs">CREATOR</p>
            <div class='text-white flex items-center p-3 bg-gray-800 rounded-lg my-3' on:click={() => selectCreator = true}>
              <div class='bg-white flex items-center justify-center w-10 h-10 rounded-full'>
                <p class='text-black'>{selectedCreator.firstname[0]}{selectedCreator.lastname[0]}</p>
              </div>
              <p class='ml-5'>{selectedCreator.firstname} {selectedCreator.lastname}</p>
            </div>
            <p class="text-gray-400 text-xs">SOCIALS</p>
            <div class='text-gray-400 text-xs'>
              {#if selectedCreator}
                {#each selectedCreator.socials as social}
                  <div class='my-2 grid grid-cols-3'>
                    <p>{social.platform}</p>
                    <p>{social.followers} Followers</p>
                    <p>50% Engagement</p>
                  </div>
                {/each}
              {/if}
            </div>
          {/if}
            <input type="button" value="Continue" class="bg-brandTeal p-3 w-full rounded-lg my-3" on:click={() => step += 1} disabled={!selectedCreator}/>
        </div>
      </div>
    {:else if step === 1}
    <!-- Add a Title -->
      <div in:fly={{x: 200, duration: 200}} class='p-8'>
        <div class="w-full">
          <p class='text-gray-400 text-xs'>TITLE</p>
          <input type="text" 
            class="w-full p-3 rounded-lg mt-3 bg-slate-600 text-white"
            bind:value={newDeal.dealName} 
            placeholder={`Ex: ${selectedCreator.firstname} ${selectedCreator.lastname} Deal`} 
          />
          <div class='flex items-center justify-between'>
            <input type="button" value="Back" class="bg-slate-600 cursor-pointer text-white p-3 w-1/2 mr-1 rounded-lg my-3" on:click={() => step -= 1} />
            <input 
              type="button" 
              value="Next" 
              class="bg-brandTeal p-3 w-1/2 ml-1 rounded-lg my-3 cursor-pointer"
              on:click={() => step += 1} 
              />
              <!-- disabled={!newDeal.dealName} -->
          </div>
        </div>
      </div>
    {:else if step === 2}
    <!-- Add a Description -->
      <div in:fly={{x: 200, duration: 200}} class='p-8'>
        <div class="w-full">
          <p class='text-gray-400 text-xs'>DESCRIPTION</p>
          <textarea 
            class="w-full p-3 rounded-lg mt-3 bg-slate-600 text-white"
            bind:value={newDeal.description} 
            placeholder={'Ex: This deal is to capture new sign-ups'} 
          />
          <div class='flex items-center justify-between'>
            <input type="button" value="Back" class="bg-slate-600 text-white p-3 w-1/2 mr-1 rounded-lg my-3" on:click={() => step -= 1} />
            <input 
              type="button" 
              value="Next" 
              class="bg-brandTeal p-3 w-1/2 ml-1 rounded-lg my-3" 
              on:click={() => step += 1} 
              />
              <!-- disabled={!newDeal.description}   -->
          </div>
        </div>
      </div>
    {:else if step === 3}
    <!-- Add delivarables -->
      <div in:fly={{x: 200, duration: 200}} class='p-8'>
        <div class="w-full">
          <p class='text-gray-400 text-xs'>DELIVERABLES</p>
          {#each deliverablesArray as d}
            <div class='flex items-center justify-between'>
              <input type="text" 
              class="flex-1 p-3 rounded-lg bg-slate-600 text-white"
              bind:value={d.description} 
              placeholder={'Ex: 30 second ad read'} 
              />
              <input type="date" 
                class='flex-1 ml-1 rounded-lg p-3 bg-slate-600 text-white' 
                bind:value={d.dueDate} />
            </div>
          {/each}
          <input 
            type="button" 
            value="+ Add a deliverable" 
            class="text-brandTeal my-3"
            on:click={handleNewDeliverable}>
          <div class='flex items-center justify-between'>
            <input type="button" value="Back" class="bg-slate-600 text-white p-3 w-1/2 mr-1 rounded-lg my-3" on:click={() => step -= 1} />
            <input 
              type="button" 
              value="Next" 
              class="bg-brandTeal p-3 w-1/2 ml-1 rounded-lg my-3" 
              on:click|preventDefault={handleAddDeal} 
            />
          </div>
        </div>
      </div>
    {/if}
      </div>
    </div>
{/if}

<BlurModal open={selectCreator} title={''} on:close={() => selectCreator = false}>
  <svelte:fragment slot="body">
    <div class="flex flex-col items-around">
      <!-- Need to add search funcitonality to creator selector -->
      <select bind:value={selectedCreator} class='p-3 bg-slate-700 text-white rounded-lg'>
        {#each creators as creator}
        <option value={creator}>{creator.firstname} {creator.lastname}</option>
        {/each}
      </select>
      <input type="button" value="Select" class="bg-brandTeal p-3 mt-3 rounded-lg" on:click|preventDefault={() => {
        handleSocials(selectedCreator)
        selectCreator = false}}/>
    </div>
  </svelte:fragment>
</BlurModal>