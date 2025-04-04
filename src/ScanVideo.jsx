import { useEffect, useRef } from "react";
import Quagga from "quagga";
import "./scanner.css";

const ScanVideo = ({ onClose }) => {
  const videoElem = useRef(null);
  const qrScanner = useRef(false);

  useEffect(() => {
    if (!qrScanner.current) {
      Quagga.init(
        {
          inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector(".video-container"), // Or '#yourElement' (optional)
          },
          decoder: {
            readers: ["ean_reader"], // List of active readers
          },
        },
        function (err) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("Initialization finished. Ready to start");
          Quagga.start();
        }
      );

      console.log("Quagga started");
      qrScanner.current = true;
    }
    Quagga.onDetected(function (result) {
      var code = result.codeResult.code;
      if (code.startsWith("86")) {
        Quagga.offProcessed();
        Quagga.offDetected();
        Quagga.stop();
        onClose(code);
      }
    });
    
    return () => {
      console.log("Quagga stopped");
      Quagga.offProcessed();
      Quagga.offDetected();
      Quagga.stop();
    };
  }, []);

  return (
    <div>
      <div className="video-container" ref={videoElem}>
        <div class="overlay"></div>
      </div>
    </div>
  );
};

export default ScanVideo;
