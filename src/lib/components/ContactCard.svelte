<script>

  export let contact

  const handleFollowerCount = (number) => {
    let dec = number.toString().split('').length - 1
    
   //todo
  }

</script>

<div class='w-full my-3 bg-blue-900 hover:bg-blue-800 text-brandWhite rounded grid grid-cols-13 sm:grid-cols-12 gap-0.5 p-5 content-center'>
  <div class='w-10 h-10 bg-brandWhite rounded-full mr-3 col-span-1'></div>
  <p class='col-span-3'>{contact.firstName} {contact.lastName}</p>
  <p class="col-span-3 text-xs">{contact.location}</p>
  <p class='col-span-3 text-xs'>{contact.deals > 0 ? contact.deals > 1 ? contact.deals + ' DEALS' : contact.deals + ' DEAL' : ''}</p>
  <div class='col-span-2 flex'>
    {#each contact.socials as social}
    <!-- add icons -->
      <p class="text-xs mx-1">{social.followers ? social.followers : ''}</p>
    {/each}
  </div>
</div>