import React, { useEffect, Suspense, lazy, useState } from "react";
import { Cover, Circular } from "../../components/ui-components";

const IGVDraw = lazy(() => delayForIGV(import("./igv.jsx")));

export default function IGVBrowser() {
  const [igvBrowser, setIgvBrowser] = useState()
  return (
    <div>
      <Cover>
        <h2> IGV Genome Browser</h2>
      </Cover>

      <div id="igv-divK">
        <Suspense fallback={<Circular />}>
          <IGVDraw igvBrowser={igvBrowser} setIgvBrowser={setIgvBrowser} />
        </Suspense>
        {igvBrowser&& "Hola"}
      </div>
    </div>
  );
}

function delayForIGV(promise) {
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  }).then(() => promise);
}
