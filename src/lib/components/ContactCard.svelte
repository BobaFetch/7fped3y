<script>
  import {Icon} from '@steeze-ui/svelte-icon'
  import {Instagram, Twitch, Twitter, Music, Youtube} from '@steeze-ui/feather-icons'
  export let contact


</script>

<div class='w-full my-3 bg-slate-700 hover:bg-slate-600 text-brandWhite rounded grid grid-cols-13 sm:grid-cols-12 gap-0.5 p-5 content-center'>
  <div class='w-10 h-10 rounded-full mr-3 col-span-1'>
    <img src={`/avatars/${contact.contact_id}.jpg`} alt="" class="rounded-full w-10 h-10">
  </div>
  <p class='col-span-3 font-header'>{contact.firstname} {contact.lastname}</p>
  <p class="col-span-3 text-sm">{contact.category}</p>
  <p class="col-span-3 text-xs">{contact.location}</p>
  <!-- ADD DEAL COUNT -->
  <!-- <p class='col-span-3 text-xs'>{'DEALS'}</p> -->

  <div class='col-span-2 flex'>
    {#each contact.socials as social}
      <p class="text-xs mx-2 flex">
        <Icon src={
        social.platform == 'Instagram' ? Instagram 
        : social.platform == 'TikTok' ? Music
        : social.platform == 'Youtube' ? Youtube
        : social.platform == 'Twitter' ? Twitter
        : Twitch
        } size='15' class="mx-2"/>
        {social.followers ? social.followers : ''}</p>
    {/each}
  </div>
</div>