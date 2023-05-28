import corner from "../public/assets/icons/corner.svg";
import Image from "next/image";

const DragOverlay = ({ allowDrag, handleDrop, handleDragLeave }) => {
  return (
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
  )
}

export default DragOverlay