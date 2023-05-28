{isDropping && (
    <>
      <section
        className="absolute z-10 bg-800 inset-0 bg-[#0284c766]"
        onDragEnter={allowDrag}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={allowDrag}
      >
        <Image
          src={corner}
          width="auto"
          height="auto"
          alt="corner"
          className="absolute top-10 left-10"
        />
        <Image
          src={corner}
          width="auto"
          height="auto"
          alt="corner"
          className="absolute top-10 right-10 rotate-90"
        />
        <Image
          src={corner}
          width="auto"
          height="auto"
          alt="corner"
          className="absolute bottom-10 left-10 -rotate-90"
        />
        <Image
          src={corner}
          width="auto"
          height="auto"
          alt="corner"
          className="absolute bottom-10 right-10 rotate-180"
        />
        <div
          className="h-screen flex justify-center items-center"
          onDrop={handleDrop}
        >
          <h3 className="text-white text-7xl opacity-100">
            Drop file anywhere
          </h3>
        </div>
      </section>
    </>
  )}
  <section
    onDragEnter={handleDragEnter}
    className={`${
      isDropping ? "opacity-50 " : ""
    } relative border-zinc-100 border-dashed border-2 p-10 flex justify-center flex-col gap-5 items-center w-full h-4/5`}
  >
    {uploading ? <SpinLoader /> : null}
    {areInvalidFiles && (
      <h3 className="text-xl bg-zinc-800 px-4 py-2 rounded-lg text-red-700">
        Invalid File Type
      </h3>
    )}
    {file ? (
      <div className="text-center">
        {doneScripting ? (
          <>
            <h3 className="text-5xl"> Calls Sent Successfully!</h3>
            <button onClick={resetStates} className="px-10 py-3 mt-10 bg-sky-600 font-medium rounded-lg">Call More!</button>
          </>
        ) : (
          <>
            {<h3 className="text-5xl">{file[0].name}</h3>}
            {<h3 className="text-5xl">{file[1].name}</h3>}
          </>
        )}
      </div>
    ) : (
      <>
        {!uploading ? (
          <>
            <span
              className="bg-sky-600 p-2 rounded-full drop-shadow-lg cursor-pointer"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              <Image
                src={uploadIcon}
                width="48"
                height="auto"
                alt="upload-icon"
              />
            </span>
            <div className="text-center">
              <h3 className="text-5xl">Drag & Drop</h3>
              <p className="text-base mt-2 text-zinc-400">
                Supports xlsx & mp3 files
              </p>
            </div>
          </>
        ) : null}
      </>
    )}
  </section>
  <input
    type="file"
    multiple
    onChange={handleInputChange}
    hidden
    ref={inputRef}
  />
  {file ? (
    <button
      className="absolute flex gap-2 top-10 right-10 px-10 bg-sky-600 py-4 text-base font-medium rounded-md"
      onClick={handleUpload}
    >
      Run Script
      <Image
        src={ArrowRight}
        height={"auto"}
        width={"auto"}
        alt="arrow-right"
      />
    </button>
  ) : null}