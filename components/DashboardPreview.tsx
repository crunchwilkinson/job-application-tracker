import { useState } from "react";
import Image from "next/image";

export function DashboardPreview() {
    const [isPreviewLoading, setIsPreviewLoading] = useState(true);
    return (
        <div className="relative hidden md:block overflow-hidden rounded-lg border border-gray-200 shadow-xl">
            {isPreviewLoading && (
                <div className="absolute inset-0 z-10 animate-pulse bg-slate-100">
                    <div className="h-600px w-800px bg-linear-to-br from-slate-100 via-slate-200 to-slate-100" />
                </div>
            )}
            <Image
                src="/hero-images/hero2.png"
                alt="Dashboard Preview"
                height={600}
                width={800}
                onLoad={() => setIsPreviewLoading(false)}
                className={`transition-opacity duration-300 ${isPreviewLoading ? "opacity-0" : "opacity-100"}`}
            />
        </div>
    );
}