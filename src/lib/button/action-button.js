

function ActionButton({children, label, ...props}) {
    return (
        <button
          className=
            "group relative aspect-square h-full px-2 flex items-center justify-center bg-theme-deskblue disabled:bg-theme-deskblue/50 hover:bg-theme-active hover:text-white transition-colors"
            {...props}
        >
        {children}
          <div className="absolute w-fit -top-8 bg-theme-active px-3 py-1 pointer-events-none opacity-0 left-0 group-hover:opacity-100 transition-opacity z-30 overflow-hidden shadow shadow-black/50">
            <p className="translate-y-4 group-hover:translate-y-0 transition-all text-nowrap">{label}</p>
          </div>
        </button>
      );
}

export default ActionButton;