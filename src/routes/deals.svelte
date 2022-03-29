<script>

  import DealsCard from '$lib/components/DealsCard.svelte'
  import SearchHeader from '$lib/components/SearchHeader.svelte'
  
  export let deals
  export let contacts
  export let users

  const leads = deals.filter(item => item.status === 'Lead')
  const contacting = deals.filter(item => item.status === 'Contacting')
  const negotiating = deals.filter(item => item.status === 'Negotiating')
  const finalizing = deals.filter(item => item.status === 'Finalizing')
  const pendingDel = deals.filter(item => item.status === 'Pending Deliverables')
  const pendingPay = deals.filter(item => item.status === 'Pending Payment')
  const paid = deals.filter(item => item.status === 'Paid')
  const archived = deals.filter(item => item.status === 'Archived')


</script>

<div class="bg-brandBlue">
  <!-- header stuff -->
  <SearchHeader title={'Deals'} />
  <!-- body  -->
  <!-- this is just thrown together a lot of copy/paste, need to break it down and streamline this bad boy -->
  <div class='relative overflow-x-hidden'>

    <div class="grid grid-cols-4 gap-2">
      <!--  -->
      <div class='w-62 p-1 shrink-0'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Leads</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{leads.length}</p>
          </div>
        </div>
        {#if leads.length > 0}
        {#each leads as l}
        <DealsCard 
          deal={l} 
          contact={contacts.find(contact => contact.contact_id === l.client_id)}
          owner={users.find(user => user.user_id === l.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>  
      <!--  -->
      <div class="w-62 shrink-0">
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Contacting</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{contacting.length}</p>
          </div>
        </div>
        {#if contacting.length > 0}
        {#each contacting as c}
        <DealsCard 
          deal={c} 
          contact={contacts.find(contact => contact.contact_id === c.client_id)}
          owner={users.find(user => user.user_id === c.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>
      <!--  -->
      <div class="w-62 shrink-0">
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Negotiating</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{negotiating.length}</p>
          </div>
        </div>
        {#if negotiating.length > 0}
        {#each negotiating as n}
        <DealsCard 
          deal={n} 
          contact={contacts.find(contact => contact.contact_id === n.client_id)}
          owner={users.find(user => user.user_id === n.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>
      <!-- Finalizing Contract -->
      <div class="w-62 shrink-0">
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Finalizing Contract</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{finalizing.length}</p>
          </div>
        </div>
        {#if finalizing.length > 0}
        {#each finalizing as f}
        <DealsCard 
          deal={f} 
          contact={contacts.find(contact => contact.contact_id === f.client_id)}
          owner={users.find(user => user.user_id === f.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>
      <!-- Pending Deliverables -->
      <div class='w-62 p-1 shrink-0'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Pending Deliverables</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{pendingDel.length}</p>
          </div>
        </div>
        {#if pendingDel.length > 0}
        {#each pendingDel as pd}
        <DealsCard 
          deal={pd} 
          contact={contacts.find(contact => contact.contact_id === pd.client_id)}
          owner={users.find(user => user.user_id === pd.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>  
      <!-- Pending Payment -->
      <div class='w-62 p-1 shrink-0'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Pending Payment</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{pendingPay.length}</p>
          </div>
        </div>
        {#if pendingPay.length > 0}
        {#each pendingPay as pp}
        <DealsCard 
          deal={pp} 
          contact={contacts.find(contact => contact.contact_id === pp.client_id)}
          owner={users.find(user => user.user_id === pp.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>  
      <!-- Paid -->
      <div class='w-62 p-1 shrink-0'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Paid</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{paid.length}</p>
          </div>
        </div>
        {#if paid.length > 0}
        {#each paid as p}
        <DealsCard 
          deal={p} 
          contact={contacts.find(contact => contact.contact_id === p.client_id)}
          owner={users.find(user => user.user_id === p.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>
      <!-- Archived -->
      <div class='w-62 p-1 shrink-0'>
        <div class="flex justify-between">
          <h5 class="text-brandWhite text-xl">Archived</h5>
          <div class='bg-brandTeal w-5 h-5 rounded-full flex items-center justify-center'>
            <p class='text-black p-0'>{archived.length}</p>
          </div>
        </div>
        {#if archived.length > 0}
        {#each archived as a}
        <DealsCard 
          deal={a} 
          contact={contacts.find(contact => contact.contact_id === a.client_id)}
          owner={users.find(user => user.user_id === a.owner_id)}
        />
        {/each}
        {:else}
        <DealsCard deal={null} contact={null} owner={null} />
        {/if}
      </div>  

    </div>
  </div>
  </div>