<script>
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher()

  export let newDeliverable

</script>

<div class="grid grid-cols-2 gap-4">
        <label class="flex flex-col text-white" for="description">Description
          <input 
            type="text" 
            name="description" 
            class="text-gray-800 p-3 rounded-lg"
            bind:value={newDeliverable.description} 
            placeholder="Ex: 1 company shoutout" 
          />
        </label>

        <label class="flex flex-col text-white" for="due-date">Due Date
          <input 
            type="date" 
            name="due-date" 
            class="text-gray-800 p-3 rounded-lg"
            bind:value={newDeliverable.duedate} 
            />
        </label>
      </div>
      <input 
        type="button" 
        class="bg-brandTeal p-3 rounded-lg mt-5 w-full"
        value="Add Deliverable"  
        on:click={() => dispatch('addDeliverable')}
      />