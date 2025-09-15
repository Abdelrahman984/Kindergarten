// src/components/SkeletonLoading.tsx
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const SkeletonLoading = () => (
  <div className="space-y-4">
    {/* Stats Skeleton */}
    <div className="grid md:grid-cols-5 gap-4">
      {[...Array(5)].map((_, i) => (
        <Card key={i}>
          <CardContent className="p-6 text-center">
            <Skeleton className="h-8 w-16 mx-auto mb-2" />
            <Skeleton className="h-4 w-24 mx-auto" />
          </CardContent>
        </Card>
      ))}
    </div>
    {/* Table Skeleton */}
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-32 mb-2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-8 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  </div>
);

export default SkeletonLoading;
