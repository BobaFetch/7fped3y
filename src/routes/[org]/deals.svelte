<script>
  import { page } from "$app/stores";
  import Card from '$lib/components/Card.svelte'
  import data from '$lib/mock_data'

  const leads = data.filter(item => item.status === 'LEAD')
  const contacting = data.filter(item => item.status === 'CONTACTING')
  const negotiating = data.filter(item => item.status === 'NEGOTIATING')
  const finalizing = data.filter(item => item.status === 'FINALIZING')

  console.log($page.params.org)
</script>

<div class="static m-3">
  <!-- header stuff -->
  <div class="flex flex-row w-full my-3 static">
    <h4 class="text-brandWhite text-2xl ">Deals</h4>
    <input type="text" placeholder="Search Deals" class="mx-auto rounded-xl w-1/2 sm:w-72 text-center" />
    <input type="button" value="+ Add a Deal" class="bg-brandTeal rounded p-2 cursor-pointer" />
  </div>
  <!-- body  -->
  <!-- this is just thrown together a lot of copy/paste, need to break it down and streamline this bad boy -->
  <div class="flex flex-row my-10 w-screen static ">

    <div class='w-64 mx-3 p-1 shrink-0 border border-white'>
      <div class="flex justify-between">
        <h5 class="text-brandWhite text-xl">Leads</h5>
        <div class='bg-brandTeal w-5 h-5 text-center rounded-full'>
          <p class='text-brandWhite p-0'>{leads.length}</p>
        </div>
      </div>
      {#if leads.length > 0}
        {#each leads as l}
          <Card props={l} />
        {/each}
      {:else}
        <Card props={null} />
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
          <Card props={c} />
        {/each}
      {:else}
        <Card props={null} />
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
          <Card props={n} />
        {/each}
      {:else}
        <Card props={null} />
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
          <Card props={f} />
        {/each}
      {:else}
        <Card props={null} />
      {/if}
    </div>
  </div>
</div>