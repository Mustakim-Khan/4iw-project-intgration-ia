"use client";
import { Box, Sheet } from "@mui/joy";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function ReceipDetails({
  params,
}: {
  params: { slug: string };
}) {
  const detailsRoute = "/api/details";

  const recipeName = params.slug;
  const [details, setDetails] = useState(null);
  const [instructions, setInstructions] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("ReceipDetails useEffect");
    setLoading(true);
    setDetails(null);
    setInstructions(null);
    const getData = async () => {
      const response = await fetch(detailsRoute, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: recipeName,
        }),
      });
      console.log("response", response);
      const data = await response.json();
      console.log("data", data);
      // setDetails(data);
      // const response2 = await fetch(`/api/recipes/${name}/instructions`);
      // const data2 = await response2.json();
      // setInstructions(data2);
      // setLoading(false);
    };
    const response = getData()
      .then((response) => response)
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <Box>
      <Sheet>
        Receipe Page : {recipeName} <br />
        Receipt Details
      </Sheet>
    </Box>
  );
}
