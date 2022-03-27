<script>

  import DealsCard from '$lib/components/DealsCard.svelte'
  import SearchHeader from '$lib/components/SearchHeader.svelte'
  import data from '$lib/mock_data.json'

  const leads = data.contacts.filter(item => item.status === 'LEAD')
  const contacting = data.contacts.filter(item => item.status === 'CONTACTING')
  const negotiating = data.contacts.filter(item => item.status === 'NEGOTIATING')
  const finalizing = data.contacts.filter(item => item.status === 'FINALIZING')

</script>

<div class="bg-brandBlue">
  <!-- header stuff -->
  <SearchHeader title={'Deals'} />
  <!-- body  -->
  <!-- this is just thrown together a lot of copy/paste, need to break it down and streamline this bad boy -->
  <div class="flex flex-row my-10 w-screen static ">

    <div class='w-64 mx-3 p-1 shrink-0'>
      <div class="flex justify-between">
        <h5 class="text-brandWhite text-xl">Leads</h5>
        <div class='bg-brandTeal w-5 h-5 text-center rounded-full'>
          <p class='text-brandWhite p-0'>{leads.length}</p>
        </div>
      </div>
      {#if leads.length > 0}
        {#each leads as l}
          <DealsCard props={l} />
        {/each}
      {:else}
        <DealsCard props={null} />
      {/if}
    </div>  
    <div class="w-64 mx-3 shrink-0">
      <div class="flex justify-between">
        <h5 class="text-brandWhite text-xl">Contacting</h5>
        <div class='bg-brandTeal w-5 h-5 text-center rounded-full'>
          <p class='text-brandWhite p-0'>{contacting.length}</p>
        </div>
      </div>
      {#if contacting.length > 0}
        {#each contacting as c}
          <DealsCard props={c} />
        {/each}
      {:else}
        <DealsCard props={null} />
      {/if}
    </div>
    <div class="w-64 mx-3 shrink-0">
      <div class="flex justify-between">
        <h5 class="text-brandWhite text-xl">Negotiating</h5>
        <div class='bg-brandTeal w-5 h-5 text-center rounded-full'>
          <p class='text-brandWhite p-0'>{negotiating.length}</p>
        </div>
      </div>
      {#if negotiating.length > 0}
        {#each negotiating as n}
          <DealsCard props={n} />
        {/each}
      {:else}
        <DealsCard props={null} />
      {/if}
    </div>
    <div class="w-64 mx-3 shrink-0">
      <div class="flex justify-between">
        <h5 class="text-brandWhite text-xl">Finalizing</h5>
        <div class='bg-brandTeal w-5 h-5 text-center rounded-full'>
          <p class='text-brandWhite p-0'>{finalizing.length}</p>
        </div>
      </div>
      {#if finalizing.length > 0}
        {#each finalizing as f}
          <DealsCard props={f} />
        {/each}
      {:else}
        <DealsCard props={null} />
      {/if}
    </div>
  </div>
</div>