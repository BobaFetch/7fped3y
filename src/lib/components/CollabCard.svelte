<script>
  import { goto } from '$app/navigation';
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Instagram, Music, Twitch, Twitter, Youtube } from '@steeze-ui/feather-icons'
  export let deal
  export let contact
  let src

  if (deal) {
    src = `/avatars/${contact.contact_id}.jpg`
  }
  console.log(contact)

</script>


{#if deal === null}
  <div class="w-64 h-20 rounded border border-brandWhite border-dotted my-1"></div>
{:else}

<div class='flex flex-col justify-center bg-slate-700 p-2 w-64 h-20 rounded my-1 hover:bg-slate-600 font-body hover:cursor-pointer' on:click={() => goto(`/collabs/${deal.deal_id}`)}>
  <div class='flex'>
    <div class='bg-brandWhite rounded-full w-10 h-10 flex justify-center items-center'>
      <!-- <Fa icon={faUserCircle} size='2x' color="black" /> -->
      <img src={src} class="rounded-full" alt={`${contact.firstName} ${contact.lastName} avatar`}/>
    </div>
    <span class="text-white ml-2 text-sm">{deal.dealName}</span>
  </div>

  <div class="flex items-center justify-between mt-1">
    {#if contact.socials}
    <div class="text-right flex">
      {#each JSON.parse(contact.socials) as social}
      <span class='text-xs text-white p-1 flex' title={`${social.platform}, ${social.followers} followers`}>
        <Icon src={
          (social.platform == 'Instagram' ? Instagram 
            : social.platform == 'TikTok' ? Music 
            : social.platform == 'Youtube' ? Youtube 
            : social.platform == 'Twitch' ? Twitch : Twitter)} 
          size='15' class="mx-1"
        />
        {social.followers}</span>
      {/each}
    </div>
    {/if}
  </div>
</div>
{/if}