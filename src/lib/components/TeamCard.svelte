<script>
  import { createEventDispatcher } from "svelte";


  export let member
  export let user
  
  const dispatch = createEventDispatcher()

  let selectedValue

  const roles = [
    'Admin',
    'Editor'
  ]
</script>

<div class="bg-slate-700 rounded-lg text-brandWhite p-5 mb-1 grid grid-cols-12 gap-2 items-center">
  <div class="h-10 w-10 bg-brandTeal rounded-full col-span-1 col-start-1 flex items-center justify-center">
      <p class="text-black text-bold font-header">{member.firstname[0].toUpperCase()}{member.lastname[0].toUpperCase()}</p>
  </div>
  <p class="text-xs col-span-2 col-start-2">{member.firstname} {member.lastname}</p>
  {#if user.role === 'Admin'}
    <select 
      bind:value={selectedValue} 
      on:change={() => {
        member.role = selectedValue
        console.log(member)}
      } 
      class="bg-slate-900 text-xs mr-2 col-span-2 col-start-5">
      <option value={member.role}>{member.role}</option>
      {#if member.role === 'Editor'}
        <option value={'Admin'}>Admin</option>
      {:else if member.role === 'Admin'}
        <option value={'Editor'}>Editor</option>
      {/if}
    </select>
  {:else}
    <p class="text-xs col-span-1 col-start-5">{member.role}</p>
  {/if}
    <p class="text-xs col-span-2 col-start-7">{member.email}</p>
    <p class="text-xs col-span-2 col-start-10">{member.phone ? member.phone : 'XXX-XXX-XXXX'}</p>
    {#if user.role === 'Admin'}
      <input type="button" value="Remove" class="text-red-500 text-xs col-span-1 col-start-12 cursor-pointer" on:click={() => dispatch('delete')}/>
    {/if}
</div>