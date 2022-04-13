<script>
  import Fa from 'svelte-fa'
  import { faUserCircle } from '@fortawesome/free-regular-svg-icons'
import { goto } from '$app/navigation';
  export let deal
  export let contact
  export let owner
  console.log()
</script>


{#if deal === null}
  <div class="w-72 h-20 rounded border border-brandWhite border-dotted my-1"></div>
{:else}

<div class='flex flex-col bg-blue-800 p-2 w-72 h-20 rounded my-1 hover:bg-blue-400 ' on:click={() => goto(`/deals/${deal.deal_id}`)}>
  <div class='flex'>
    <div class='bg-brandWhite rounded-full w-10 h-10 p-1.5 flex justify-center items-center'>
      <Fa icon={faUserCircle} size='2x' color="black" />
    </div>
    <span class="text-white ml-2 text-sm">{deal.dealName}</span>
  </div>

  <div class="flex items-center justify-between mt-1">
    {#if contact.socials}
    <div class="text-right">
      {#each JSON.parse(contact.socials) as social}
      <span class='text-xs text-white p-1'>{social.platform} {social.followers}</span>
      {/each}
    </div>
    {/if}
    <div class="bg-brandTeal w-5 h-5 text-xs text-black rounded-full flex justify-center items-center">{owner.firstName[0]}{owner.lastName[0]}</div>
  </div>
</div>
{/if}