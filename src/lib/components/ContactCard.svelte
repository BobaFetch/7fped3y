<script>
  // import * as avatars from '$lib/assets/avatars'
  export let contact
  // const socials = JSON.parse(contact.socials)
  // console.log(avatars)

</script>

<div class='w-full my-3 bg-slate-700 hover:bg-slate-600 text-brandWhite rounded grid grid-cols-13 sm:grid-cols-12 gap-0.5 p-5 content-center'>
  <div class='w-10 h-10 bg-brandWhite rounded-full mr-3 col-span-1'>
    <img src={`/avatars/${contact.contact_id}.jpg`} alt="" class="rounded-full">
  </div>
  <p class='col-span-3'>{contact.firstName} {contact.lastName}</p>
  <p class="col-span-3 text-xs">{contact.location}</p>
  <p class='col-span-3 text-xs'>{'DEALS'}</p>
  <!-- NEED TO FIX -->
  <div class='col-span-2 flex'>
    <!-- {#each socials as social}
    add icons
      <p class="text-xs mx-1">{social.platform[0]} {social.followers ? social.followers : ''}</p>
    {/each} -->
  </div>
</div>