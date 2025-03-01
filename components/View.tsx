import React from "react";
import Ping from "@/components/Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { formatNumber } from "@/lib/utils";
import { notFound } from "next/navigation";
import { writeClient } from "@/sanity/lib/write";
import { after } from "next/server";

const View = async ({ id }: { id: string }) => {
  const postById = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUP_VIEWS_QUERY, { id });
  if (!postById?.views) return notFound();

  after(async () => {
    await writeClient
      .patch(id)
      .set({ views: postById.views + 1 })
      .commit();
  });

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{formatNumber(postById.views)}</span>
      </p>
    </div>
  );
};

export default View;
