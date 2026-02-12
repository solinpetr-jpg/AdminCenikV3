import PackageCard from './PackageCard'
import { topPackages } from './data/topPackages'

export default function TopPackagesSection() {
  return (
    <div className="row g-3">
      {topPackages.map((pkg) => (
        <div key={pkg.id} className="col-12 col-md-6 col-lg-4">
          <PackageCard package={pkg} />
        </div>
      ))}
    </div>
  )
}
