<script>
  //get data
  export let deal 
  export let deliverables

  deal = {
    deal_id: 1,
    title: "Carly Marier X Shoutouts",
    description: "Series of shoutouts",
    status: 'Pending Deliverables'
  }

  deliverables = [
  {
    deal_id: 1,
    description: "[TikTok] 1 renegade dance with shoutouts",
    dueDate: "2022-07-02",
    delivered: 1,
    deliveredDate: "2022-07-02"
  },
  {
    deal_id: 1,
    description: "[TikTok] 1 duet with our company account",
    dueDate: "2022-07-09",
    delivered: 0,
    deliveredDate: null
  },
  {
    deal_id: 1,
    description: "1 Instagram post with #tournamentshoutouts hashtag",
    dueDate: "2022-07-09",
    delivered: 0,
    deliveredDate: null,
  }
  ]

  const statusOptions =[
    'Lead',
    'Contacting',
    'Negotiating',
    'Finalizing Contract',
    'Pending Deliverables',
    'Pending Payment',
    'Paid',
    'Archived'
  ]
</script>

<div>
  <div class="flex items-center mb-5">
    <button class="text-gray-900 border border-gray-900 px-4 py-3 rounded-lg bg-brandTeal">{"<"}</button>
    <h1 class="text-brandWhite mx-5 text-4xl italic bold">{deal.title}</h1>
  </div>
  <div class="grid grid-cols-12 gap-2 text-white my-2">
    <!-- details -->
    <div class="col-span-8">
      <div class="bg-blue-900 rounded-lg p-3">
        <h3 class="text-2xl">Details</h3>
        <div class="my-5">
          <p class="text-gray-300 text-sm mb-2">DESCRIPTION</p>
          <p class="font-thin pl-1">{deal.description}</p>
        </div>
        <div>
          <p class="text-gray-300 text-sm">DELIVERABLES</p>
          <table class="w-full">
            <thead>
              <tr>
                <th></th>
                <th>DUE DATE</th>
                <th>DELIVERED</th>
                <th>DELIVERED DATE</th>
                <th></th>
              </tr>
            </thead>
            <tbody class='font-thin'>
              {#each deliverables as {description, dueDate, delivered, deliveredDate}}
                <tr class="py-3">
                  <td>{description}</td>
                  <td class="text-center">{new Date(dueDate).toLocaleDateString()}</td>
                  <td class="text-center">
                    <input type="checkbox" bind:checked={delivered} />
                  </td>
                  <td class="text-center">{deliveredDate === null ? '' : new Date(deliveredDate).toLocaleDateString()}</td>
                  <td><input type="button" value="X" /></td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- right menu -->
    <div class="col-span-4">
      <div class="grid grid-rows-6 gap-2" >
        <!-- deal status -->
        <div class="row-span-1 bg-blue-900 rounded-lg p-3">
          <p class="text-brandWhite mb-3 font-bold">Status</p>
          <select 
            bind:value={deal.status}
            class="bg-gray-800 p-2 rounded-lg w-full"  
          >
            {#each statusOptions as status}
              <option value={status}>{status}</option>
            {/each}
          </select>
        </div>
        <!-- team  -->
        <div class='bg-blue-900 rounded-lg p-3'>
          <p class="font-bold">Team</p>
          <p class="font-light text-gray-400 text-sm my-2">OWNER</p>
          <div class="flex items-center my-2">
            <div class="h-10 w-10 bg-brandWhite rounded-full flex justify-center items-center">
              <p class='text-black'>KS</p>
            </div>
            <p class='ml-5'>Keisha Smith</p>
          </div>
        </div>
        <!-- creator -->
        <div class="row-span-3 bg-blue-900 rounded-lg p-3">
          <p class="font-bold">CREATOR</p>
          <div class="my-2 flex items-center">
            <div class="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <p class="text-black">CM</p>
            </div>
            <p class="ml-5">Carly Marier</p>
          </div>
          <p class="text-gray-400 font-light text-sm mt-5">SOCIALS</p>
          <div class="my-2 grid grid-rows gap-3">
            <div class='grid grid-cols-5 gap-2 text-sm font-light'>
              <p class="col-span-1">TikTok</p>
              <p class="col-span-2">340K Followers</p>
              <p class="col-span-2">54% Engagement</p>
            </div>
            <div class='grid grid-cols-5 gap-2 text-sm font-light'>
              <p class="col-span-1">Instagram</p>
              <p class="col-span-2">102K Followers</p>
              <p class="col-span-2">10% Engagement</p>
            </div>
            <div class='grid grid-cols-5 gap-2 text-sm font-light'>
              <p class="col-span-1">Youtube</p>
              <p class="col-span-2">10K Followers</p>
              <p class="col-span-2">33% Engagement</p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>