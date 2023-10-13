"use client"

import { useState } from "react";
import { useMutation } from "convex/react";
import { useParams } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { useEdgeStore } from "@/lib/edgestore";
import { useCoverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "../single-image-dropzone";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";

export const CoverImageModal = () => {
    const params = useParams();
    const coverImage = useCoverImage();
    const { edgestore } = useEdgeStore();

    const update = useMutation(api.documents.update);

    const [file, setFile] = useState<File>();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onClose = () => {
        setFile(undefined);
        setIsSubmitting(false);
        coverImage.onClose();
    };

    const onChange = async (file?: File) => {
        if (file) {
            setIsSubmitting(true);
            setFile(file);

            const res = await edgestore.publicFiles.upload({
                file,
                options: {
                    replaceTargetUrl: coverImage.url,
                },
            });

            await update({
                id: params.documentId as Id<"documents">,
                coverImage: res.url,
            });

            onClose();
        }
    };

    return (
        <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
            <DialogContent>
                <DialogHeader className="border-b pb-3">
                    <h2 className="text-lg font-semibold text-center">
                        Cover Image
                    </h2>
                </DialogHeader>

                <SingleImageDropzone onChange={onChange} disabled={isSubmitting} value={file} className="w-full outline-none" />
            </DialogContent>
        </Dialog>
    );
};