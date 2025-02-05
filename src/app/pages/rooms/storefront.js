
function Storefront({money}) {

    return (
        <>
            <img src="/assets/storefront/desk-larger.png" alt="black" className='row-start-1 col-start-1 w-full h-full'/>
            <img src="/assets/storefront/bushes-larger.png" alt="bushes" className='row-start-1 col-start-1 w-full h-full' />
            <img src="/assets/storefront/empty_shelves-larger.png" alt="shelves" className='row-start-1 col-start-1 w-full h-full' />
            <img src="/assets/storefront/shelf_jar-larger.gif" alt="jar" className='row-start-1 col-start-1 w-full h-full' />
            <div className='flex justify-start absolute right-2 top-2 gap-2 px-4 py-2 bg-black border-4 border-theme-deskblue w-fit'> {/* money box */}
                <img src="/assets/coin_placeholder.png" alt="money" className='md:size-7 size-6'/>
                <span className='text-white text-xl'>{money}</span>
            </div>
        </>
    )
}

export default Storefront;