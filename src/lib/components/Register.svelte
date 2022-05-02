<script>
  import {fly} from 'svelte/transition'
  import { goto } from '$app/navigation';
  import {authenticated} from '$lib/stores/tempStore'
  import { Icon } from '@steeze-ui/svelte-icon'
  import { Loader } from '@steeze-ui/feather-icons'

  export let newSignUp
  let email
  let password
  let companyName

  let registrationStep = 1
  let loadingModal = true

  const handleLogin = () => {
    newSignUp = false
  }

  const handleRegistrationStep = () => {
    registrationStep += 1
  }

  const handleDelay = () => {
    loadingModal = false
    setTimeout(() => {
      goto('/collabs')
    }, 2000)
    $authenticated = true
  }
</script>

<div in:fly={{x:200, duration: 400}} class="container-full mx-auto" class:blur-sm={!loadingModal}>
  {#if registrationStep === 1}
  <div in:fly={{x:200, duration: 400}} class='flex flex-col justify-center items-center w-full mb-5'>
    <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>First, enter your email</h1>
    <h4 class="text-[#cccccc] my-5">We suggest using the email address you use at work</h4>
    <input type="email" bind:value={email} placeholder="ex: name@work-email.com" class="w-1/2 my-5 p-3 rounded-lg bg-[#ddf0f2]" autofocus/>
    <button 
      class="bg-[#52c0cc] w-1/2 p-3 rounded-lg"
      class:bg-teal-600={!email} 
      on:click|preventDefault={handleRegistrationStep} 
      disabled={!email}>Continue</button>
  </div>
  
  {:else if registrationStep === 2}
    <div in:fly={{x:200, duration: 400}} class='flex flex-col justify-center items-center w-full mb-5'>
      <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>And your password</h1>
      <h4 class="text-[#cccccc] my-5">Make it memorable</h4>
      <input type="password" bind:value={password} placeholder="Password" class="w-1/2 my-5 p-3 rounded-lg bg-[#ddf0f2]" autofocus/>
      <button 
      class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" 
      class:bg-teal-600={!password}
      on:click|preventDefault={handleRegistrationStep} 
      disabled={!password}>Continue</button>
    </div>
    
    {:else if registrationStep === 3}
    <div in:fly={{x:200, duration: 400}} class='flex flex-col justify-center items-center w-full mb-5'>
      <!-- <h6 class="text-xs text-[#cccccc]">Step 1 of 3</h6> -->
      <h1 class='text-brandWhite text-center text-4xl sm:text-5xl md:text-6xl italic font-bold mb-5'>What's your company's name?</h1>
      <h4 class="text-[#cccccc] my-5">Choose something your team will recognize</h4>
      <input type="text" bind:value={companyName} placeholder="" class="w-1/2 my-5 p-3 rounded-lg bg-[#ddf0f2]" autofocus />
      <!-- <button class="bg-[#52c0cc] w-1/2 p-3 rounded-lg" on:click|preventDefault={handleRegistrationStep} class:opacity-50={!companyName} disabled={!companyName ? true : false}>Continue</button> -->
      <button class="bg-[#52c0cc] w-1/2 p-3 rounded" on:click|preventDefault={handleDelay}  disabled={!companyName ? true : false}>Finish</button>
    </div>
    {/if}
    <p class="text-brandWhite text-center">Already have an account? <span on:click={handleLogin} class=" text-[#6ecad4] cursor-pointer">Log In</span></p>
</div>

<div class:hidden={loadingModal} class="absolute top-0 left-0 w-full h-full">
  <div class="flex items-center justify-center h-full">
      <Icon src={Loader} width="100" height="100" class="text-teal-500 animate-spin-slow" />
  </div>
</div>