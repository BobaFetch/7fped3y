<script>
  import SearchHeader from '$lib/components/SearchHeader.svelte'
  import NewDeal from '$lib/components/NewDeal.svelte'

  import DraggableColumns from '$lib/components/DraggableColumns.svelte'
  
  export let deals
  export let contacts

  const leads = deals.filter(item => item.status === 'Lead')
  const contacting = deals.filter(item => item.status === 'Contacting')
  const negotiating = deals.filter(item => item.status === 'Negotiating')
  const finalizing = deals.filter(item => item.status === 'Finalizing Contract')
  const pendingDel = deals.filter(item => item.status === 'Pending Deliverables')
  const pendingPay = deals.filter(item => item.status === 'Pending Payment')
  const paid = deals.filter(item => item.status === 'Paid')

  let showModal = false
  let columnItems

  if (deals) {
    deals.map(deal => deal.id = deal.deal_id)
    columnItems = [
      {
        id: 1,
        title: 'Leads',
        items: [...leads]
      },
      {
        id: 2,
        title: 'In Flight',
        items: [...contacting, ...negotiating, ...finalizing]
      },
      {
        id: 3,
        title: 'Pending Deliverables',
        items: [...pendingDel]
      },
      {
        id: 4,
        title: 'Pending Payment',
        items: [...pendingPay]
      },
      {
        id: 5,
        title: 'Paid',
        items: [...paid]
      }
    ]
  }


</script>

<div class="bg-slate-900 overflow-x-hidden" class:blur-sm={showModal}>
  
  <div class=''>
    <SearchHeader title={'Collabs'} bind:showModal/>
  </div>

  <div class='overflow-x-hidden'>
    <DraggableColumns columns={columnItems} contacts={contacts} />
  </div>

</div>
<NewDeal open={showModal} on:close={() => showModal = false} />