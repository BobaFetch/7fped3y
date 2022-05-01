<script>
  export let creator
  export let socials
  console.log(creator)
</script>

<div class="">
  <p class="font-bold">CREATOR</p>
  <a href={`/contacts/${creator.contact_id}`}>
    <div class="my-2 flex items-center">
      <div class="h-10 w-10 bg-white rounded-full flex items-center justify-center">
        <img src={`/avatars/${creator.contact_id}.jpg`} class="rounded-full" alt=""/>
      </div>
      <p class="ml-5">{creator.firstname} {creator.lastname}</p>
    </div>
  </a>
  <p class="text-gray-400 font-light text-sm mt-5">SOCIALS</p>
  <div class="my-2 grid grid-rows gap-3">
    {#each creator.socials as social}
      <div class="grid grid-cols-5 gap-2 text-sm font-light w-full">
        <p class="col-span-1">{social.platform}</p>
        <p class="col-span-2 text-right">{social.followers} Followers</p>
        <p class="col-span-2 text-right">50% Engagement</p>
      </div>
    {/each}
  </div>
</div>