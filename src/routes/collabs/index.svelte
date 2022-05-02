<script>

  import CollabCard from '$lib/components/CollabCard.svelte'
  import SearchHeader from '$lib/components/SearchHeader.svelte'
  import NewDeal from '$lib/components/NewDeal.svelte'
  
  export let deals
  export let contacts
  export let users

  const leads = deals.filter(item => item.status === 'Lead')
  const contacting = deals.filter(item => item.status === 'Contacting')
  const negotiating = deals.filter(item => item.status === 'Negotiating')
  const finalizing = deals.filter(item => item.status === 'Finalizing Contract')
  const pendingDel = deals.filter(item => item.status === 'Pending Deliverables')
  const pendingPay = deals.filter(item => item.status === 'Pending Payment')
  const paid = deals.filter(item => item.status === 'Paid')
  const archived = deals.filter(item => item.status === 'Archived')

  let showModal = false


</script>

<div class="bg-slate-900 overflow-x-hidden" class:blur-sm={showModal}>
  
  <!-- header stuff -->
  <div class=''>
    <SearchHeader title={'Collabs'} bind:showModal/>
  </div>
  <!-- body  -->
  <!-- this is just thrown together a lot of copy/paste, need to break it down and streamline this bad boy -->
  <div class='overflow-x-hidden'>

    <div class="flex flex-row justify-between overflow-auto py-5 mx-3 h-screen">
      <!--  -->
      <div class=''>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl font-header">Leads</h5>
          <div class='w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-gray-500 hover:text-gray-200 p-0'>{leads.length}</p>
          </div>
        </div>
        {#if leads.length > 0}
        {#each leads as l}
        <CollabCard 
          deal={l} 
          contact={contacts.find(contact => contact.contact_id === l.client_id)}
          owner={users.find(user => user.user_id === l.owner_id)}
        />
        {/each}
        {:else}
        <CollabCard deal={null} contact={null} owner={null} />
        {/if}
      </div>  
      <!--  -->
      <div class='mx-1 p-1'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl font-header">Pitching</h5>
          <div class='w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-gray-500 hover:text-gray-200 p-0'>{contacting.length}</p>
          </div>
        </div>
        {#if contacting.length > 0}
        {#each contacting as c}
        <CollabCard 
          deal={c} 
          contact={contacts.find(contact => contact.contact_id === c.client_id)}
          owner={users.find(user => user.user_id === c.owner_id)}
        />
        {/each}
        {:else}
        <CollabCard deal={null} contact={null} owner={null} />
        {/if}
      </div>
      
      <!-- Pending Deliverables -->
      <div class='mx-1 p-1'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Pending Deliverables</h5>
          <div class='w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-gray-500 hover:text-gray-200 p-0'>{pendingDel.length}</p>
          </div>
        </div>
        {#if pendingDel.length > 0}
        {#each pendingDel as pd}
        <CollabCard 
          deal={pd} 
          contact={contacts.find(contact => contact.contact_id === pd.client_id)}
          owner={users.find(user => user.user_id === pd.owner_id)}
        />
        {/each}
        {:else}
        <CollabCard deal={null} contact={null} owner={null} />
        {/if}
      </div>  
      <!-- Pending Payment -->
      <div class='mx-1 p-1'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Pending Payment</h5>
          <div class='w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-gray-500 hover:text-gray-200 p-0'>{pendingPay.length}</p>
          </div>
        </div>
        {#if pendingPay.length > 0}
        {#each pendingPay as pp}
        <CollabCard 
          deal={pp} 
          contact={contacts.find(contact => contact.contact_id === pp.client_id)}
          owner={users.find(user => user.user_id === pp.owner_id)}
        />
        {/each}
        {:else}
        <CollabCard deal={null} contact={null} owner={null} />
        {/if}
      </div>  
      <!-- Paid -->
      <div class='mx-2 p-1'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Paid</h5>
          <div class='w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-gray-500 hover:text-gray-200 p-0'>{paid.length}</p>
          </div>
        </div>
        {#if paid.length > 0}
        {#each paid as p}
        <CollabCard 
          deal={p} 
          contact={contacts.find(contact => contact.contact_id === p.client_id)}
          owner={users.find(user => user.user_id === p.owner_id)}
        />
        {/each}
        {:else}
        <CollabCard deal={null} contact={null} owner={null} />
        {/if}
      </div>
    </div>
  </div>
</div>
<NewDeal open={showModal} on:close={() => showModal = false} />