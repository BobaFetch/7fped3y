<script>
  import {fly} from 'svelte/transition'
  import {user} from '$lib/stores/tempStore'

  export let newSignUp
   let email
   let companyName
   let clientUrl
   let inviteLink = 'https://www.bogusinvitelink.com/208329023'

  let registrationStep = 5

  const handleLogin = () => {
    newSignUp = false
  }

  const handleRegistrationStep = () => {
    registrationStep += 1
  }

  const handleCopyText = async () => {
    await navigator.clipboard.writeText(inviteLink)
    //this is dumb. write a better solution than alert
    alert('copied!')
  }
</script>

<div in:fly={{x:200, duration: 200}} class="container mx-auto">
  {#if registrationStep === 1}
  <div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5'>
    <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>First, enter your email</h1>
    <h4 class="text-[#cccccc] my-5">We suggest using the email address you use at work</h4>
    <input type="email" bind:value={email} placeholder="ex: name@work-email.com" class="w-1/2 my-5 p-3 rounded-lg bg-[#ddf0f2]" />
    <button class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" on:click|preventDefault={handleRegistrationStep}>Continue</button>
  </div>
  <p class="text-brandWhite text-center">Already have an account? <span on:click={handleLogin} class=" text-[#6ecad4] cursor-pointer">Log In</span></p>

  {:else if registrationStep === 2}
    <div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5'>
      <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>And your password</h1>
      <h4 class="text-[#cccccc] my-5">Make it memorable</h4>
      <input type="password" bind:value={email} placeholder="Password" class="w-1/2 my-5 p-3 rounded-lg bg-[#ddf0f2]" />
      <button class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" on:click|preventDefault={handleRegistrationStep}>Continue</button>
    </div>
    <p class="text-brandWhite text-center">Already have an account? <span on:click={handleLogin} class=" text-[#6ecad4] cursor-pointer">Log In</span></p>

  {:else if registrationStep === 3}
  <div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5'>
    <h6 class="text-xs text-[#cccccc]">Step 1 of 3</h6>
    <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>What's your company's name?</h1>
    <h4 class="text-[#cccccc] my-5">Choose something your team will recognize</h4>
    <input type="text" bind:value={companyName} placeholder="" class="w-1/2 my-5 p-3 rounded-lg bg-[#ddf0f2]" />
    <button class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" on:click|preventDefault={handleRegistrationStep} class:opacity-50={!companyName} disabled={!companyName ? true : false}>Continue</button>
  </div>
  {:else if registrationStep === 4}
  <div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5'>
    <h6 class="text-xs text-[#cccccc]">Step 2 of 3</h6>
    <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>Which Youtuber is your compnay working with right now?</h1>
    <h4 class="text-[#cccccc] my-5">Enter the creator's youtube URL</h4>
    <input type="text" bind:value={clientUrl} placeholder="ex: www.youtube.com/MrBeast" class="w-1/2 my-5 p-3 rounded-lg bg-[#ddf0f2]" />
    <button class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" on:click|preventDefault={handleRegistrationStep} class:opacity-50={!clientUrl} disabled={!clientUrl ? true : false}>Continue</button>
  </div>
  {:else if registrationStep === 5}
  <div in:fly={{x:200, duration: 200}} class='flex flex-col justify-center items-center w-full mb-5'>
    <h6 class="text-xs text-[#cccccc]">Step 3 of 3</h6>
    <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>Lastly, who's working on this YouTube deal with you?</h1>
    <h4 class="text-[#cccccc] my-5">Share this invite link with your colleagues so you can work together</h4>
    <div class="w-1/2 flex flex-row justify-center items-center">
      <input type="text" bind:value={inviteLink} placeholder="ex: www.youtube.com/MrBeast" class="my-5 mr-0 p-3 rounded-l-lg bg-[#ddf0f2] flex-1" />
      <input type="button" class="bg-[#52c0cc] ml-0 p-3 h-1/2 rounded-r-lg cursor-pointer" value="copy" on:click|preventDefault={handleCopyText}>
    </div>
    <button class="bg-[#52c0cc] w-1/2 p-3 rounded" on:click|preventDefault={handleRegistrationStep} class:opacity-50={!clientUrl} disabled={!clientUrl ? true : false}>Finish</button>
  </div>
  {/if}
</div>