<script>
  import {fly} from 'svelte/transition'
  import {contactStore} from '$lib/stores/tempStore'
  
  export let showModal

  let contactsArray = $contactStore

  let contact = {
    contact_id: $contactStore.length + 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    category: '',
    into: '',
    description: '',
    location: '',
    title: '',
    socials: [
      {
        platform: '',
        url: ''
      }
    ]
  }
  
  const socials = ['YouTube', 'TikTok', 'Instagram', 'Twitter']
  let selectedPlatform
  let screen = 1
  let xParams = 0

  const handleNextScreen = () => {
    screen += 1
    xParams = 200
  }

  const handlePrevScreen = () => {
    screen -= 1
    xParams = -200
  }

  const handleNewSocial = () => {
    //not rerendering page currently need to fix

    contact.socials.push({
      platform: '',
      url: ''
    })

    contact.socials = contact.socials
  }

  const handleAddCreator = () => {
    //TODO
    //write logic to add creator info to db
    contactsArray.push(contact)

    $contactStore = contactsArray
    console.log($contactStore)
    showModal = false
  }

</script>

{#if screen === 1}
<div in:fly={{x: xParams, duration: 200}} class='flex flex-col text-brandWhite'>
  <h6 class="text-xs text-gray-400 my-1">STEP 1 OF 4</h6>
  <h4 class="text-2xl font-bold my-1">Add a New Contact</h4>
  <h6 class="text-xs text-gray-400 my-2">First, what's the creator's name?</h6>
  <label for="name" class="text-gray-400 my-2">NAME</label>
  <input type="text" name='first-name' id='first-name' class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite' bind:value={contact.firstName} placeholder="First name">
  <input type="text" name='last-name' id='last-name' class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite' bind:value={contact.lastName} placeholder='Last name'>
  <input type="submit" value="CONTINUE" class=' bg-brandTeal rounded-lg p-2 mt-8' on:click|preventDefault={handleNextScreen} disabled={(!contact.firstName && contact.lastName) ? true : false}>
</div>

{:else if screen === 2}
  <div in:fly={{x: xParams, duration: 200}} class='flex flex-col text-brandWhite'>
    <h6 class='text-xs text-gray-400 my-1'>STEP 2 OF 4</h6>
      <h4 class='text-2xl font-bold my-1'>Add Socials</h4>
      <h6 class='text-xs text-gray-400 my-2'> Which social channels does this creator have?</h6>
      <h6 class='text-gray-400 my-2'>SOCIALS</h6>
      <!--  -->
      {#each contact.socials as value, index}
        <div>
          <select bind:value={value.platform} class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm">
            {#each socials as social}
            <option value={social}>{social}</option>
            {/each}
          </select>
          <input type="text" class="my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm w-1/2" bind:value={value.url} placeholder='ex:http://www.youtube.com/mrbeast' />
          <button class="p-1 rounded-full m-4" on:click={() => {
            contact.socials.splice(index, 1)
            contact.socials = contact.socials
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 0 24 24" width="24px" fill="#52c0cc"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
          </button>
        </div>
      {/each}
      <button class=" text-brandTeal text-xs text-left my-2" on:click|preventDefault={handleNewSocial}>+ Add a social channel</button>
      <!--  -->
      <div class='mt-8 flex justify-around '>
        <input class="bg-gray-500 text-black p-2 mr-1 rounded-lg w-full" type="submit" on:click|preventDefault={handlePrevScreen} value="Back">
        <input class="bg-brandTeal p-2 rounded-lg ml-1 w-full" type="submit" on:click|preventDefault={handleNextScreen} disabled={(!contact.firstName && contact.lastName) ? true : false}>
      </div>
  </div>

  {:else if screen === 3}
  <div in:fly={{x: xParams, duration: 200}} class='flex flex-col text-brandWhite'>
    <h6 class="text-xs text-gray-400 my-1">STEP 3 OF 4</h6>
    <h4 class='text-2xl font-bold my-1'>Add Contact Info</h4>
    <h6 class="text-xs text-gray-400 my-2">How will you get in touch with {contact.firstName} {contact.lastName} </h6>
    <label class='text-gray-400 mt-2' for='email'>EMAIL</label>
      <input class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm ' type="email" name='email' id='email' bind:value={contact.email} placeholder="ex:hello@creator.com">
    <label class='text-gray-400 mt-2' for="phone">PHONE</label>
      <input class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm ' type="text" name='phone' id='phone' bind:value={contact.phone} placeholder='XXX-XXX-XXX (optional)'>
    <div class="mt-8 flex justify-around">
      <input class='bg-gray-500 text-black p-2 mr-1 rounded-lg w-full' type="submit" on:click|preventDefault={handlePrevScreen} value="Back">
      <input class="bg-brandTeal p-2 rounded-lg ml-1 w-full" type="submit" on:click|preventDefault={handleNextScreen} disabled={(!contact.email) ? true : false}>
    </div>
  </div>

  {:else if screen === 4}
  <div in:fly={{x: xParams, duration: 200}} class='flex flex-col text-brandWhite'>
    <h6 class="text-xs text-gray-400 my-1">STEP 4 OF 4</h6>
    <h4 class='text-2xl font-bold my-1'>Add About Info</h4>
    <h6 class="text-xs text-gray-400 my-2">Lastyly, let's add some details about {contact.firstName} {contact.lastName} </h6>
    <label class='text-gray-400 mt-2' for='category'>CATEGORY</label>
      <input class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm '  type="text" name='category' id='category' bind:value={contact.category} placeholder="How would you categorize this creator?">
    
    <label class='text-gray-400 mt-2'  for="intro">INTRO</label>
      <input class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm '  type="text" name='intro' id='intro' bind:value={contact.intro} placeholder='How did you get introduced to this creator?'>
    
    <label class='text-gray-400 mt-2'  for="description">DESCRIPTION</label>
      <input class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm '  type="text" name='description' id='description' bind:value={contact.description} placeholder='1-liner to summarize this creator'>
    
    <label class='text-gray-400 mt-2'  for="location">LOCATION</label>
      <input class='my-1 p-2 rounded-lg bg-blue-900 text-brandWhite text-sm '  type="text" name='location' id='location' bind:value={contact.location} placeholder='Where is this creator currently located?'>
    <div class="mt-8 flex justify-around">
      <input class='bg-gray-500 text-black p-2 mr-1 rounded-lg w-full'  type="submit" on:click|preventDefault={handlePrevScreen} value="Back">
      <input class="bg-brandTeal p-2 rounded-lg ml-1 w-full"  type="submit" on:click|preventDefault={handleAddCreator} disabled={false}>
    </div>
  </div>
  {/if}