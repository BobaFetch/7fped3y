<script>
  import { createEventDispatcher, onMount } from "svelte";
  // import ContactCard from "$lib/components/ContactCard.svelte";
  import Modal from "$lib/components/Modal.svelte";

  export let open = true
  let step = 0
  // modal on modal action
  let selectCreator = false
  let creators 
  let socials

  let selectedCreator = null
  let selectedSocials = null

  let content = [
    {
      header: 'Add a New Deal',
      description: 'First, who is this deal for?'

    }
  ]
  const dispatch = createEventDispatcher()

  const getCreators = async () => {
    await fetch('/api/creators')
    .then(res => res.json())
    .then(json => {
      creators = json.creators
      socials = json.socials
    })
    .catch(err => console.log(err))

    selectedCreator = creators[0]
    handleSocials(selectedCreator)

    // console.log(selectedSocials)
  }

  const handleSocials = (contact) => {
    selectedSocials = socials.filter(social => social.contact_id === contact.contact_id)
  }

  onMount(() => {
    getCreators()
  })
</script>

{#if open}
  {#if step === 0}
    <div class="modal z-50 fixed w-full h-full top-0 left-0 flex items-center justify-center p-8 lg:p-0">
      <div class="modal-overlay fixed w-full h-full bg-black opacity-75"></div>
      <div class="bg-brandBlue w-full lg:h-max lg:w-1/2  mx-auto rounded-lg shadow-xl z-50 overflow-y-auto">
        <div class="flex items-start head text-2xl font-bold text-brandWhite justify-between">
          <div class='m-2'>
            <p class="text-xs text-gray-400 font-light">STEP {step+1} of 4</p>
            <h1 class="my-2">{content[step].header}</h1>
            <p class="text-sm text-gray-400 mt-2 font-light">{content[step].description}</p>
          </div>
          <button class="rounded-full m-2 " on:click={() => dispatch('close')}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>
          </button>
        </div>
        <div class="content p-8">
          <!-- body content -->
          <div>
            {#if selectedCreator}
              <p class="text-gray-400 text-xs">CREATOR</p>
              <div class='text-white flex items-center p-3 bg-gray-800 rounded-lg my-3' on:click={() => selectCreator = true}>
                <div class='bg-white flex items-center justify-center w-10 h-10 rounded-full'>
                  <p class='text-black'>{selectedCreator.firstName[0]}{selectedCreator.lastName[0]}</p>
                </div>
                <p class='ml-5'>{selectedCreator.firstName} {selectedCreator.lastName}</p>
              </div>
              <p class="text-gray-400 text-xs">SOCIALS</p>
              <div class='bg-blue-800 rounded-lg mt-2 p-2 text-white text-sm'>
                {#if selectedSocials}
                  {#each selectedSocials as social}
                    <div class='my-1 grid grid-cols-3'>
                      <p>{social.platform}</p>
                      <p>{social.followers} Followers</p>
                      <p>50% Engagement</p>
                    </div>
                  {/each}
                {/if}
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {:else if step === 2}
  <div>

  </div>
  {/if}
{/if}

<Modal open={selectCreator} title={''} on:close={() => selectCreator = false}>
  <svelte:fragment slot="body">
    <div class="flex flex-col items-around">
      <select bind:value={selectedCreator} class='p-3 bg-blue-900 text-white'>
        {#each creators as creator}
        <option value={creator}>{creator.firstName} {creator.lastName}</option>
        {/each}
      </select>
      <input type="button" value="Select" class="bg-brandTeal p-3 mt-3 rounded-lg" on:click|preventDefault={() => {
        handleSocials(selectedCreator)
        selectCreator = false}}/>
    </div>
  </svelte:fragment>
</Modal>