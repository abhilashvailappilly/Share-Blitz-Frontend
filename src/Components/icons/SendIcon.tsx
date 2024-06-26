function IconSendCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    // <div className="w-fit" style={{ backgroundColor: 'green', borderRadius: '50%', display: 'inline-block', padding: '0px' }}>
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="3em"
        width="3em"
        className="w-fit"
        {...props}
      >
        <path d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2M8 7.71v3.34l7.14.95-7.14.95v3.34L18 12 8 7.71z" className="p-2" />
      </svg>
    // </div>
  );
}

export default IconSendCircle;
