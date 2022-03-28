<script>
  import { createEventDispatcher } from "svelte";


  export let member
  export let user
  export let isRemoveModalOpen
  export let index
  export let i
  
  const dispatch = createEventDispatcher()

  let selectedValue

  const roles = [
    'Admin',
    'Editor'
  ]
</script>

<div class="bg-blue-900 rounded-lg text-brandWhite p-5 mb-1 grid items-center">
  <div class="h-10 w-10 bg-brandWhite rounded-full" />
                  <p class="text-xs">{member.firstName} {member.lastName}</p>
                  {#if user.role === 'Admin'}
                    <select bind:value={selectedValue} on:change={() => {member.role = selectedValue
                    console.log(member)}} class="bg-brandBlue text-xs mr-2">
                      <option value={member.role}>{member.role}</option>
                      {#if member.role === 'Editor'}
                      <option value={'Admin'}>Admin</option>
                      {:else if member.role === 'Admin'}
                      <option value={'Editor'}>Editor</option>
                      {/if}
                    </select>
                  {:else}
                    <p class="text-xs">{member.role}</p>
                  {/if}
                  <p class="text-xs">{member.email}</p>
                  <p class="text-xs col-span-6 col-start-6">{member.phone ? member.phone : 'XXX-XXX-XXXX'}</p>
                  {#if user.role === 'Admin'}
                    <input type="button" value="Remove" class="text-red-500 text-xs col-span-1 col-start-12" on:click={() => dispatch('delete')}/>
                  {/if}
</div>