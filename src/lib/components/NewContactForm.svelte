<script>
  import {fly} from 'svelte/transition'

  let contact = {
    firstName: '',
    lastName: '',
    location: '',
    title: '',
    socials: []
  }

  let screen = 1
  let socialId = 1
  let xParams = 0

  //contact vars
  let tempSocials = [{
    platform: '',
    url: ''
  }
  ]
  let socialObj = {
    platform: '',
    url: ''
  }
  

  const handleNextScreen = () => {
    screen += 1
    xParams = 200
  }

  const handlePrevScreen = () => {
    screen -= 1
    xParams = -200
  }

  const handleNewSocial = () => {
    tempSocials.push({
      platform: '',
      url: ''
    })
  }

  const socials = ['YouTube', 'TikTock', 'Instagram', 'Twitter']
</script>

{#if screen === 1}
<div in:fly={{x: xParams, duration: 200}} class='flex flex-col '>
  <h6 class="text-xs">STEP 1 OF 4</h6>
  <h4>Add a New Contact</h4>
  <h6 class="text-xs">First, what's the creator's name?</h6>
  <h6 class="text-xs">NAME</h6>
  <input type="text" name='first-name' id='first-name' class='border border-black' bind:value={contact.firstName} placeholder="First name">
  <input type="text" name='last-name' id='last-name' bind:value={contact.lastName} placeholder='Last name'>
  <input type="submit" on:click|preventDefault={handleNextScreen} disabled={(!contact.firstName && contact.lastName) ? true : false}>
</div>

{:else if screen === 2}
  <div in:fly={{x: xParams, duration: 200}} class='flex flex-col '>
    <h6 class='text-xs'>STEP 2 OF 4</h6>
      <h4>Add Socials</h4>
      <h6 class='text-xs'> Which social channels does this creator have?</h6>
      <h6 class='text-xs'>SOCIALS</h6>
      <!--  -->
      {#each tempSocials as value, index}
        <div>
          <select>
            {#each socials as social}
            <option value={value.platform}>{social}</option>
            {/each}
          </select>
          <input type="text" bind:value={value.url} placeholder='ex:http://www.youtube.com/mrbeast' />
          <button class="p-1 rounded-full m-4" on:click={() => tempSocials.splice(index, 1)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
          </button>
        </div>
      {/each}
      <button on:click|preventDefault={handleNewSocial}>Add a social channel</button>
      <!--  -->
      <div>
        <input type="submit" on:click|preventDefault={handlePrevScreen} value="Back">
        <input type="submit" on:click|preventDefault={handleNextScreen} disabled={(!contact.firstName && contact.lastName) ? true : false}>
      </div>
  </div>
  {/if}