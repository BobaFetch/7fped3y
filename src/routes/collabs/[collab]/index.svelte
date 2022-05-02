<script>
  import { onDestroy } from "svelte";
  import { goto } from '$app/navigation'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { ChevronLeft } from '@steeze-ui/feather-icons'
  import CreatorCard from '$lib/components/CreatorCard.svelte'
  import Modal from "$lib/components/Modal.svelte";
  import NewDeliverableModal from "$lib/components/NewDeliverableModal.svelte";


  //get data
  // export let deals
  export let deal 
  export let deliverables
  export let creator
  export let team
  console.log(deal)

  let deliverableModal = false
  let editDescription = false
  let deleteDeal = false


  const statusOptions =[
    'Lead',
    'Contacting',
    'Negotiating',
    'Finalizing Contract',
    'Pending Deliverables',
    'Pending Payment',
    'Paid',
    'Archived'
  ]

  let newDeliverable = {
    deal_id: deal.deal_id,
    description: '',
    dueDate: '',
    delivered: 0,
    deliveredDate: null
  }

  const handleAddDeliverable = async () => {
    const res = await fetch('/api/deliverable', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newDeliverable)
    })
    if(res.ok) {
      let { data } = await res.json()
      deliverables = data
    }
    deliverableModal = false
  }

  const handleDelDeliverable = async (deliverable) => {
    const res = await fetch(`/api/deliverable?deliverable=${deliverable.deliverable_id}&deal=${deliverable.deal_id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      }
    })

    if (res.ok) {
      let { data } = await res.json()
      deliverables = data
    }
    
  }

  const handleUpdateDeliverable = async (deliverable) => {
    
    const res = await fetch(`/api/deliverable`, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(deliverable)
    })
    if (res.ok) {
      let { data } = await res.json()
      deliverables = data
    }
  }

  const handleUpdateDealStatus = async () => {
    const res = await fetch(`/api/deal`, {
      method: 'PUT',
      mode: 'cors',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(deal)
    })
    //just in case
    editDescription = false
  }

  const handleDeleteDeal = async () => {
    await fetch(`/api/deal?deal_id=${deal.deal_id}`, {
      method: 'DELETE',
      mode: 'cors'
    }).then(() => goto('/deals'))
  }

  onDestroy(() => {
    // update database
    
  })
</script>

<div class="mx-3">
  <div class="flex items-center justify-between mb-5">
    <div class="flex items-center">
      <button
      on:click={() => goto('/collabs')} 
      class="text-gray-900 border border-gray-900 p-3 rounded-lg bg-brandTeal">
      <Icon src={ChevronLeft} size="20" />
    </button>
      <h1 class="text-brandWhite mx-5 text-4xl italic bold font-header">{deal.dealName}</h1>
    </div>
    <input class="bg-brandTeal p-2 rounded-lg" type="button" value="Delete" on:click={() => deleteDeal = true}>
  </div>
  <div class="grid grid-cols-12 gap-2 text-white my-2">
    <!-- details -->
    <div class="col-span-8 font-body">
      <div class="bg-slate-800 rounded-lg p-3">
        <h3 class="text-2xl font-header">Details</h3>
        <div class="my-5">
          <div class="flex justify-between">
            <p class="text-gray-300 text-sm mb-2 font-header">DESCRIPTION</p>
            <input class="text-brandTeal cursor-pointer" type="button" value="Edit" on:click={() => editDescription = true}>
          </div>
          <p class="font-thin pl-1">{deal.dealDescription}</p>
        </div>
        <div class="py-5">
          <p class="text-gray-300 text-sm font-header">DELIVERABLES</p>

          {#if deal.deliverables.length > 0}
          <table class="w-full">
            <thead>
              <tr>
                <th></th>
                <th>DUE DATE</th>
                <th>DELIVERED</th>
                <th>DELIVERED DATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody class='font-thin'>
              {#each deal.deliverables as deliverable}
                <tr class="py-3">
                  <td>{deliverable.description}</td>
                  <td class="text-center">{new Date(deliverable.duedate).toDateString()}</td>
                  <td class="text-center">
                    <input 
                      type="checkbox" 
                      bind:checked={deliverable.delivered}  
                      on:click={() => handleUpdateDeliverable(deliverable)}
                    />
                  </td>
                  <td class="text-center">{deliverable.delivereddate === null ? '' : new Date(deliverable.delivereddate).toLocaleDateString()}</td>
                  <td><input class="text-brandTeal cursor-pointer p-2" type="button" value="X" on:click={() => handleDelDeliverable(deliverable)} /></td>
                </tr>
              {/each}
            </tbody>
          </table>
          <!-- add an else clause to display no deliverables? -->
          {/if}
          <input 
            class="my-3 text-brandTeal italic font-light"
            type="button" 
            value="+ Add a deliverable" 
            on:click={() => deliverableModal = true}/>
        </div>
      </div>
    </div>
    <!-- right menu -->
    <div class="col-span-4">
      <div class="grid grid-rows-6 gap-2" >
        <!-- deal status -->
        <div class="row-span-1 bg-slate-800 rounded-lg p-3">
          <p class="text-brandWhite mb-3 font-bold">Status</p>
          <select 
            bind:value={deal.status}
            on:change={handleUpdateDealStatus}
            class="bg-slate-900 p-2 rounded-lg w-full"  
          >
            {#each statusOptions as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
        <!-- team  -->
        <div class='bg-slate-800 rounded-lg p-3 row-span-2'>
          <p class="font-bold">Team</p>
          <div>
            <p class="font-light text-gray-400 text-sm my-2">OWNER</p>
            <div class="flex items-center my-2 ml-2">
              <div class="h-10 w-10 bg-brandWhite rounded-full flex justify-center items-center">
                <p class='text-black'>{team.find(member => member.user_id === deal.owner_id).firstname[0] + team.find(member => member.user_id === deal.owner_id).lastname[0]}</p>
              </div>
              <p class='ml-5'>{team.find(member => member.user_id === deal.owner_id).firstname} {team.find(member => member.user_id === deal.owner_id).lastname}</p>
            </div>
          </div>
          <div>
            {#if team}
            <p class="font-light text-gray-400 text-sm mt-8">MEMBERS</p>
              {#each team.filter(val => val.user_id !== deal.owner_id) as t}
              <div class="flex items-center my-2 ml-2">
                <div class="h-10 w-10 bg-brandWhite rounded-full flex justify-center items-center">
                  <p class="text-black">{t.firstname[0]+t.lastname[0]}</p>
                </div>
                <p class="ml-5">{t.firstname} {t.lastname}</p>
              </div>
              {/each}
            {/if}
          </div> 
        </div>
         
        <div class="row-span-3 bg-slate-800 rounded-lg p-3">
          <CreatorCard {creator} />
        </div> 
      </div>
      
    </div>
  </div>

  <!-- Deliverable Modal -->
  <Modal open={deliverableModal} title={'Add a New Deliverable'} on:close={() => deliverableModal = false}>
    <svelte:fragment slot="body">
      <NewDeliverableModal on:addDeliverable={handleAddDeliverable} bind:newDeliverable  />
    </svelte:fragment>
  </Modal>

  <!-- Description Modal -->
  <Modal open={editDescription} title={"Edit Description"} on:close={() => editDescription = false}>
    <svelte:fragment slot="body">
      <div class="flex flex-col">
        <input 
          type="text" 
          bind:value={deal.dealDescription} 
          class="p-2 rounded-lg my-2"
          placeholder="Ex: some example">
        <input 
          type="button" 
          on:click={handleUpdateDealStatus} 
          class="bg-brandTeal p-2 rounded-lg my-2"
          value="Update">
      </div>
    </svelte:fragment>
  </Modal>

  <!-- DELETE CONFIRMATION -->
  <Modal open={deleteDeal} title={"Delete Deal"} on:close={() => deleteDeal = false}>
    <svelte:fragment slot="body">
      <div class="flex flex-col">
        <!-- <p class="text-2xl text-white font-bold">DELETE DEAL</p> -->
        <p class="text-gray-300 text-sm font-thin mb-10">Are you sure you want to delete this deal?</p>
        <div class="grid grid-cols-2 gap-2">
          <input class="bg-red-400 p-2 rounded-lg" type="button" value="Cancel" on:click={() => deleteDeal = false}>
          <input class="bg-brandTeal p-2 rounded-lg" type="button" value="Confirm" on:click={handleDeleteDeal} />
        </div>
      </div>
    </svelte:fragment>
  </Modal>
</div>