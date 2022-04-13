<script>
  import { onDestroy } from "svelte";
  import { goto } from '$app/navigation'
  import CreatorCard from '$lib/components/CreatorCard.svelte'
  import Modal from "$lib/components/Modal.svelte";


  //get data
  // export let deals
  export let deal 
  export let deliverables
  export let socials 
  export let creator
  let deliverableModal = false

  // console.log(socials)

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
    const res = await fetch(`/api/deliverable?deliverable=${deliverable.deliverable_id}`, {
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

  onDestroy(() => {
    // update database
    
  })
</script>

<div>
  <div class="flex items-center mb-5">
    <button
      on:click={() => goto('/deals')} 
      class="text-gray-900 border border-gray-900 px-4 py-3 rounded-lg bg-brandTeal">{"<"}</button>
    <h1 class="text-brandWhite mx-5 text-4xl italic bold">{deal.dealName}</h1>
  </div>
  <div class="grid grid-cols-12 gap-2 text-white my-2">
    <!-- details -->
    <div class="col-span-8">
      <div class="bg-blue-900 rounded-lg p-3">
        <h3 class="text-2xl">Details</h3>
        <div class="my-5">
          <div class="flex justify-between">
            <p class="text-gray-300 text-sm mb-2">DESCRIPTION</p>
            <input class="text-brandTeal" type="button" value="Edit">
          </div>
          <p class="font-thin pl-1">{deal.dealDescription}</p>
        </div>
        <div>
          <p class="text-gray-300 text-sm">DELIVERABLES</p>

          {#if deliverables.length > 0}
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
              {#each deliverables as deliverable}
                <tr class="py-3">
                  <td>{deliverable.description}</td>
                  <td class="text-center">{new Date(deliverable.dueDate).toDateString()}</td>
                  <td class="text-center">
                    <input 
                      type="checkbox" 
                      bind:checked={deliverable.delivered}  
                      on:click={() => handleUpdateDeliverable(deliverable)}
                    />
                  </td>
                  <td class="text-center">{deliverable.deliveredDate === null ? '' : new Date(deliverable.deliveredDate).toLocaleDateString()}</td>
                  <td><input class="text-brandTeal" type="button" value="X" on:click={() => handleDelDeliverable(deliverable)} /></td>
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
        <div class="row-span-1 bg-blue-900 rounded-lg p-3">
          <p class="text-brandWhite mb-3 font-bold">Status</p>
          <select 
            bind:value={deal.status}
            class="bg-gray-800 p-2 rounded-lg w-full"  
          >
            {#each statusOptions as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
        <!-- team  -->
        <div class='bg-blue-900 rounded-lg p-3'>
          <p class="font-bold">Team</p>
          <p class="font-light text-gray-400 text-sm my-2">OWNER</p>
          <div class="flex items-center my-2">
            <div class="h-10 w-10 bg-brandWhite rounded-full flex justify-center items-center">
              <p class='text-black'>KS</p>
            </div>
            <p class='ml-5'>Keisha Smith</p>
          </div>
        </div>
        <!-- creator -->
        <div class="row-span-3 bg-blue-900 rounded-lg p-3">
          <CreatorCard {creator} {socials} />
        </div>
      </div>
      
    </div>
  </div>
  <Modal open={deliverableModal} title={'Add a New Deliverable'} on:close={() => deliverableModal = false}>
    <svelte:fragment slot="body">
      <div class="grid grid-cols-2 gap-4">
        <label class="flex flex-col text-white" for="description">Description
          <input 
            type="text" 
            name="description" 
            class="text-gray-800"
            bind:value={newDeliverable.description} 
            placeholder="Ex: 1 company shoutout" 
          />
        </label>

        <label class="flex flex-col text-white" for="due-date">Due Date
          <input 
            type="date" 
            name="due-date" 
            class="text-gray-800"
            bind:value={newDeliverable.dueDate} 
            />
        </label>
      </div>
      <input 
        type="button" 
        class="bg-brandTeal p-3 rounded-lg mt-5 w-full"
        value="Add Deliverable"  
        on:click={handleAddDeliverable}
      />
    </svelte:fragment>
  </Modal>
</div>